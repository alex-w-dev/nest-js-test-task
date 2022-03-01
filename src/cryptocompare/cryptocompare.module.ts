import { Module } from '@nestjs/common';
import { CryptocompareController } from './cryptocompare.controller';
import { CryptocompareService } from './cryptocompare.service';

@Module({
  controllers: [CryptocompareController],
  providers: [CryptocompareService],
})
export class CryptocompareModule {}
