import { Injectable } from '@nestjs/common';
import { CURRENCY_PAIRS } from '../../common/constants/currency-pairs';
import { ICurrencyPair } from '../../common/interfaces';
import { OnEvent } from '@nestjs/event-emitter';
import { CurrencyCode } from '../../common/enums/currency-code.enum';
import { ICurrencyPairSyms } from '../../cryptocompare/cryptocompare.service';

@Injectable()
export class CurrencyPairConfigService {
  private availableCurrencyPairs: ICurrencyPair[] = [];
  private availableCurrencyPairsAsSyms: ICurrencyPairSyms = {
    fsyms: [],
    tsyms: [],
  };

  constructor() {
    this.updateAvailableCurrencyPairs();
  }

  getAllAvailableCurrencyPairs(): ICurrencyPair[] {
    return this.availableCurrencyPairs;
  }

  getAllAvailableCurrencyPairsAsSyms(): ICurrencyPairSyms {
    return this.availableCurrencyPairsAsSyms;
  }

  isCurrencyPairAvailable(currencyPair: ICurrencyPair): boolean {
    return this.getAllAvailableCurrencyPairs().some(
      (pair) => pair === currencyPair,
    );
  }

  @OnEvent('currency-pairs.updated')
  private handleCurrencyPairUpdate(): void {
    this.updateAvailableCurrencyPairs();
  }

  private updateAvailableCurrencyPairs(): void {
    const pairs = new Set<ICurrencyPair>();
    const fsyms = new Set<CurrencyCode>();
    const tsyms = new Set<CurrencyCode>();

    this.getConfiguredCurrencyPairs().forEach((pair) => {
      this.getToWaysCurrencyPair(pair).forEach((p) => pairs.add(p));
    });
    pairs.forEach((pair) => {
      const pairArr = pair.split('-');
      fsyms.add(pairArr[0] as CurrencyCode);
      tsyms.add(pairArr[1] as CurrencyCode);
    });

    this.availableCurrencyPairs = Array.from(pairs.values());
    this.availableCurrencyPairsAsSyms = {
      fsyms: Array.from(fsyms.values()),
      tsyms: Array.from(tsyms.values()),
    };
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
