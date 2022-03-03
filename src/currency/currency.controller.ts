import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrencyPairPriceService } from './services/currency-pair-price.service';
import { ICurrencyPair } from '../common/interfaces';
import { CurrencyAvailablePairsResponseDto } from './dto/currency-available-pairs-response.dto';
import { CurrencyCode } from '../common/enums/currency-code.enum';
import {
  CryptocompareService,
  ICryptocomparePriceMultiFullResponse,
} from '../cryptocompare/cryptocompare.service';
import { CurrencyPairConfigService } from './services/currency-pair-config.service';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(
    private currencyPairPriceService: CurrencyPairPriceService,
    private cryptocompareService: CryptocompareService,
    private currencyPairConfigService: CurrencyPairConfigService,
  ) {}

  @Get('available-pairs')
  @ApiOperation({ summary: 'All available currency pairs' })
  @ApiResponse({
    type: CurrencyAvailablePairsResponseDto,
    description: 'List of available currency pairs.',
  })
  currencyPairs(): CurrencyAvailablePairsResponseDto {
    return {
      currencyPairs:
        this.currencyPairConfigService.getAllAvailableCurrencyPairs(),
    };
  }

  @Get('prices')
  @ApiOperation({
    summary: 'List of currency prices according cryptocompate.com',
  })
  @ApiQuery({
    name: 'fsyms',
    description:
      'FROM symbols: codes of available currency codes, separated by ","',
    example: 'BTC,USD',
  })
  @ApiQuery({
    name: 'tsyms',
    description:
      'TO symbols: codes of available currency codes, separated by ","',
    example: 'EUR,RUB',
  })
  @ApiResponse({
    type: 'object',
    description: 'All data is fresh',
  })
  async prices(
    @Query('fsyms') fsyms: string | CurrencyCode[],
    @Query('tsyms') tsyms: string | CurrencyCode[],
  ): Promise<ICryptocomparePriceMultiFullResponse> {
    if (typeof fsyms === 'string') fsyms = fsyms.split(',') as CurrencyCode[];
    if (typeof tsyms === 'string') tsyms = tsyms.split(',') as CurrencyCode[];

    this.validateCurrencyPairs(fsyms, tsyms);

    try {
      return this.cryptocompareService.getPriceMultiFull(fsyms, tsyms);
    } catch (e) {
      console.error(
        'cryptocompare.com is not available trying to get data from DB',
      );
      console.error(e);
    }

    return this.currencyPairPriceService.getCryptocomparePricesMultiFull(
      fsyms,
      tsyms,
    );
  }

  private validateCurrencyPairs(fsyms: CurrencyCode[], tsyms: CurrencyCode[]) {
    const notAvailablePairs: ICurrencyPair[] = [];
    for (const fsym of fsyms) {
      for (const tsym of tsyms) {
        const pair = `${fsym}-${tsym}` as ICurrencyPair;
        if (!this.currencyPairConfigService.isCurrencyPairAvailable(pair)) {
          notAvailablePairs.push(pair);
        }
      }
    }

    if (notAvailablePairs.length) {
      throw new BadRequestException(
        `Request has not available currency pairs: ${notAvailablePairs.join()}`,
      );
    }
  }
}
