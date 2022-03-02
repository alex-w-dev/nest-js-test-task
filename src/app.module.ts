import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CryptocompareModule } from './cryptocompare/cryptocompare.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CurrencyModule } from './currency/currency.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DBNAME'),
        user: configService.get<string>('MONGODB_USER'),
        pass: configService.get<string>('MONGODB_PASSWORD'),
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    CryptocompareModule,
    CurrencyModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
