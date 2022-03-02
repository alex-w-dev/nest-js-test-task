import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptocompareService } from './cryptocompare.service';
import { CryptocomparePriceResponseDto } from './dto/cryptocompare-price-response.dto';
import { ICurrencyPair } from '../common/interfaces';

@ApiTags('cryptocompare')
@Controller('cryptocompare')
export class CryptocompareController {
  constructor(private cryptocompareService: CryptocompareService) {}

  @Get('currency-pairs')
  @ApiOperation({ summary: 'All available currency pairs' })
  @ApiResponse({
    type: [String],
    description:
      'List of available currency pairs. Notice: BTC-EUR means, that is can be EUR-BTC too',
  })
  currencyPairs() {
    return this.cryptocompareService.getAllAvailableCurrencyPairs();
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
    type: CryptocomparePriceResponseDto,
    description: 'All data is fresh',
  })
  async prices(
    @Query('fsyms') fsyms: string | string[],
    @Query('tsyms') tsyms: string | string[],
  ): Promise<CryptocomparePriceResponseDto> {
    if (typeof fsyms === 'string') fsyms.split(',');
    if (typeof tsyms === 'string') tsyms.split(',');

    const currencyPairs: ICurrencyPair[] = [];

    for (const fsym of fsyms) {
      for (const tsym of tsyms) {
        currencyPairs.push(`${fsym}-${tsym}`);
      }
    }

    return {
      docs: await this.cryptocompareService.getPricesByCurrencyPair(
        currencyPairs,
      ),
    };
  }
}
