import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { CryptocompareModule } from '../cryptocompare/cryptocompare.module';

@Module({
  imports: [CryptocompareModule],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
