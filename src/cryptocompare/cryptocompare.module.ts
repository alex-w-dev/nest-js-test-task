import { Module } from '@nestjs/common';
import { CryptocompareController } from './cryptocompare.controller';

@Module({
  controllers: [CryptocompareController]
})
export class CryptocompareModule {}
