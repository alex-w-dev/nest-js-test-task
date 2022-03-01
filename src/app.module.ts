import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CryptocompareModule } from './cryptocompare/cryptocompare.module';

@Module({
  imports: [CryptocompareModule],
  controllers: [AppController],
})
export class AppModule {}
