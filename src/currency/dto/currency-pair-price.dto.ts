import { ApiProperty } from '@nestjs/swagger';
import { CryptocomparePriceDisplayDto } from '../../cryptocompare/dto/cryptocompare-price-display.dto';
import { CryptocomparePriceRawDto } from '../../cryptocompare/dto/cryptocompare-price-raw.dto';
import { CurrencyCode } from '../../common/enums/currency-code.enum';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class CurrencyPairPriceDto {
  @Prop({
    enum: CurrencyCode,
    required: true,
  })
  @ApiProperty({
    type: 'enum',
    enum: CurrencyCode,
  })
  tsym: CurrencyCode;

  @Prop({
    enum: CurrencyCode,
    required: true,
  })
  @ApiProperty({
    type: 'enum',
    enum: CurrencyCode,
  })
  fsym: CurrencyCode;

  @Prop()
  @ApiProperty({
    type: CryptocomparePriceRawDto,
  })
  raw: CryptocomparePriceRawDto;

  @Prop()
  @ApiProperty({
    type: CryptocomparePriceDisplayDto,
  })
  display: CryptocomparePriceDisplayDto;
}
