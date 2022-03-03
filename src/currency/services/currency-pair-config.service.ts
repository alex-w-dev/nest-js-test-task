import { Injectable } from '@nestjs/common';
import { ICurrencyPair } from '../../common/interfaces';
import { OnEvent } from '@nestjs/event-emitter';
import { CurrencyCode } from '../../common/enums/currency-code.enum';
import { ICurrencyPairSyms } from '../../cryptocompare/cryptocompare.service';
import { AppConfig } from '../../../configs/app.config';

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

  isAllCurrencyPairsAvailable(currencyPairs: ICurrencyPair[]): boolean {
    return !currencyPairs.some((pair) => !this.isCurrencyPairAvailable(pair));
  }

  @OnEvent('currency-pairs.updated')
  private handleCurrencyPairUpdate(): void {
    this.updateAvailableCurrencyPairs();
  }

  private updateAvailableCurrencyPairs(): void {
    const pairs = new Set<ICurrencyPair>(this.getConfiguredCurrencyPairs());
    const fsyms = new Set<CurrencyCode>();
    const tsyms = new Set<CurrencyCode>();

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
    const currencyPairs: ICurrencyPair[] = [];

    AppConfig.currencyPairs.forEach((pairConfig) => {
      currencyPairs.push(
        ...this.unwindCurrencySymsToPaisString(
          pairConfig.fsyms,
          pairConfig.tsyms,
        ),
      );

      if (pairConfig.canBeMirrored) {
        currencyPairs.push(
          ...this.unwindCurrencySymsToPaisString(
            pairConfig.tsyms,
            pairConfig.fsyms,
          ),
        );
      }
    });

    return currencyPairs;
  }

  private unwindCurrencySymsToPaisString(
    fsyms: CurrencyCode[],
    tsyms: CurrencyCode[],
  ): ICurrencyPair[] {
    const currencyPairs: ICurrencyPair[] = [];
    for (const fsym of fsyms) {
      for (const tsym of tsyms) {
        currencyPairs.push(`${fsym}-${tsym}`);
      }
    }
    return currencyPairs;
  }
}
