import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CryptocompareModule } from './cryptocompare/cryptocompare.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [CryptocompareModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
