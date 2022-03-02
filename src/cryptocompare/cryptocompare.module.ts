import { Module } from '@nestjs/common';
import { CryptocompareService } from './cryptocompare.service';

@Module({
  controllers: [],
  providers: [CryptocompareService],
  exports: [CryptocompareService],
})
export class CryptocompareModule {}
