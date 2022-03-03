import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyController } from './currency.controller';
import { CurrencyPairPriceService } from './services/currency-pair-price.service';
import { CryptocompareModule } from '../cryptocompare/cryptocompare.module';
import { CurrencyPairPriceSchema } from '../common/chemas/currency-pair-price.chema.dto';
import { CurrencyPairPriceDto } from './dto/currency-pair-price.dto';
import { CurrencyPairConfigService } from './services/currency-pair-config.service';
import { CurrencyPairSchedulerService } from './services/currency-pair-scheduler.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CurrencyPairPriceDto.name, schema: CurrencyPairPriceSchema },
    ]),
    CryptocompareModule,
  ],
  controllers: [CurrencyController],
  providers: [
    CurrencyPairPriceService,
    CurrencyPairConfigService,
    CurrencyPairSchedulerService,
  ],
})
export class CurrencyModule {}
