import { ApiProperty } from '@nestjs/swagger';
import { CryptocomparePriceRawDto } from './cryptocompare-price-raw.dto';
import { CryptocomparePriceDisplayDto } from './cryptocompare-price-display.dto';
import { ICurrencyPair } from '../../common/interfaces';

export class CryptocompareCurrencyPairPriceDto {
  @ApiProperty({
    type: String,
  })
  currencyPair: ICurrencyPair;

  @ApiProperty({
    type: CryptocomparePriceRawDto,
  })
  cryptocomparePriceRaw: CryptocomparePriceRawDto;

  @ApiProperty({
    type: CryptocomparePriceDisplayDto,
  })
  cryptocomparePriceDisplay: CryptocomparePriceDisplayDto;
}
