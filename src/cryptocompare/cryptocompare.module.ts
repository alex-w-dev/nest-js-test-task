import { Module } from '@nestjs/common';
import { CryptocompareService } from './cryptocompare.service';

@Module({
  controllers: [],
  providers: [CryptocompareService],
})
export class CryptocompareModule {}
