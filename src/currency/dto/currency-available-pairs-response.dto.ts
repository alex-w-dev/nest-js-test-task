import { ApiProperty } from '@nestjs/swagger';
import { ICurrencyPair } from '../../common/interfaces';

export class CurrencyAvailablePairsResponseDto {
  @ApiProperty({
    type: [String],
  })
  currencyPairs: ICurrencyPair[];
}
