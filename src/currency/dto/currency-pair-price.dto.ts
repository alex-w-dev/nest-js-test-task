import { ApiProperty } from '@nestjs/swagger';
import { ICurrencyPair } from '../../common/interfaces';
import { CryptocomparePriceDisplayDto } from '../../cryptocompare/dto/cryptocompare-price-display.dto';
import { CryptocomparePriceRawDto } from '../../cryptocompare/dto/cryptocompare-price-raw.dto';

export class CurrencyPairPriceDto {
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
