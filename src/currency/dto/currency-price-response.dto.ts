import { CurrencyPairPriceDto } from './currency-pair-price.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CurrencyPriceResponseDto {
  @ApiProperty({
    type: [CurrencyPairPriceDto],
  })
  docs: CurrencyPairPriceDto[];
}
