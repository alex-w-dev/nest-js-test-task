import { CryptocompareCurrencyPairPriceDto } from './cryptocompare-currency-pair-price.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CryptocomparePriceResponseDto {
  @ApiProperty({
    type: [CryptocompareCurrencyPairPriceDto],
  })
  docs: CryptocompareCurrencyPairPriceDto[];
}
