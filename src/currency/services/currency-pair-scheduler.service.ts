import { Injectable } from '@nestjs/common';
import { CurrencyPairPriceService } from './currency-pair-price.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CurrencyPairSchedulerService {
  private updating = false;

  constructor(private currencyPairPriceService: CurrencyPairPriceService) {}

  // FIXME - this. is bad solution, good solution is subscribing to cryptocompare.com through web sockets,
  // FIXME - but we have limits for free account (600 subscriptions)
  @Cron('*/2 * * * * *')
  async handleCronUpdatingDB() {
    if (this.updating) {
      return;
    }

    this.updating = true;

    try {
      await this.currencyPairPriceService.updateAllAccordingCryptocompare();
    } catch (e) {
      // errors shouldn't stop processes
      console.error(e); // FIXME - move out to another logger or messenger, which inform us about problem
    }

    this.updating = false;
  }
}
