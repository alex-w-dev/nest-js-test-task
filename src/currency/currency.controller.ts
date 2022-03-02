import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { CurrencyPriceResponseDto } from './dto/currency-price-response.dto';
import { ICurrencyPair } from '../common/interfaces';
import { CurrencyAvailablePairsResponseDto } from './dto/currency-available-pairs-response.dto';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(private cryptocompareService: CurrencyService) {}

  @Get('available-pairs')
  @ApiOperation({ summary: 'All available currency pairs' })
  @ApiResponse({
    type: CurrencyAvailablePairsResponseDto,
    description: 'List of available currency pairs.',
  })
  currencyPairs(): CurrencyAvailablePairsResponseDto {
    return {
      currencyPairs: this.cryptocompareService.getAllAvailableCurrencyPairs(),
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
    type: CurrencyPriceResponseDto,
    description: 'All data is fresh',
  })
  async prices(
    @Query('fsyms') fsyms: string | string[],
    @Query('tsyms') tsyms: string | string[],
  ): Promise<CurrencyPriceResponseDto> {
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
