import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CryptocompareModule } from './cryptocompare/cryptocompare.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [CryptocompareModule, EventEmitterModule.forRoot(), CurrencyModule],
  controllers: [AppController],
})
export class AppModule {}
