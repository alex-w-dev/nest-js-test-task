import { Injectable } from '@nestjs/common';
import { CURRENCY_PAIRS } from '../common/constants/currency-pairs';
import { ICurrencyPair } from '../common/interfaces';
import { CryptocompareCurrencyPairPriceDto } from './dto/cryptocompare-currency-pair-price.dto';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CryptocompareService {
  private availableCurrencyPairs: ICurrencyPair[] = [];

  constructor() {
    this.updateAvailableCurrencyPairs();
  }

  getAllAvailableCurrencyPairs(): ICurrencyPair[] {
    return this.availableCurrencyPairs;
  }

  isCurrencyPairAvailable(currencyPair: ICurrencyPair): boolean {
    return this.getAllAvailableCurrencyPairs().some(
      (pair) => pair === currencyPair,
    );
  }

  async getPricesByCurrencyPair(
    currencyPairs: ICurrencyPair[],
  ): Promise<CryptocompareCurrencyPairPriceDto[]> {
    const availablePairs = currencyPairs.filter((pair) =>
      this.isCurrencyPairAvailable(pair),
    );

    // TODO make request in DB

    return [];
  }

  @OnEvent('currency-pairs.updated')
  private handleCurrencyPairUpdate(): void {
    this.updateAvailableCurrencyPairs();
  }

  private updateAvailableCurrencyPairs(): void {
    const set = new Set<ICurrencyPair>();
    this.getConfiguredCurrencyPairs().forEach((pair) => {
      this.getToWaysCurrencyPair(pair).forEach((p) => set.add(p));
    });

    this.availableCurrencyPairs = Array.from(set.values());
  }

  private getConfiguredCurrencyPairs(): ICurrencyPair[] {
    return CURRENCY_PAIRS;
  }

  private getToWaysCurrencyPair(
    currencyPair: ICurrencyPair,
  ): [ICurrencyPair, ICurrencyPair] {
    const [currency1, currency2] = currencyPair.split('-');

    return [currencyPair, `${currency2}-${currency1}`];
  }
}
