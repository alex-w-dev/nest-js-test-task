import { ApiProperty } from '@nestjs/swagger';
import { ICurrencyPair } from '../../common/interfaces';
import { CryptocomparePriceDisplayDto } from '../../cryptocompare/dto/cryptocompare-price-display.dto';
import { CryptocomparePriceRawDto } from '../../cryptocompare/dto/cryptocompare-price-raw.dto';
import { CurrencyCode } from '../../common/enums/currency-code.enum';

export class CurrencyPairPriceDto {
  @ApiProperty({
    type: 'enum',
    enum: CurrencyCode,
  })
  tsym: ICurrencyPair;

  @ApiProperty({
    type: 'enum',
    enum: CurrencyCode,
  })
  fsym: ICurrencyPair;

  @ApiProperty({
    type: CryptocomparePriceRawDto,
  })
  raw: CryptocomparePriceRawDto;

  @ApiProperty({
    type: CryptocomparePriceDisplayDto,
  })
  display: CryptocomparePriceDisplayDto;
}
