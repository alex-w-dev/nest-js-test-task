import { Injectable } from '@nestjs/common';
import { CurrencyPairPriceService } from './currency-pair-price.service';

@Injectable()
export class CurrencyPairSchedulerService {
  constructor(private currencyPairPriceService: CurrencyPairPriceService) {}

  // TODO implement cron
}
