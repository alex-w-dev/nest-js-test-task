import { Injectable } from '@nestjs/common';
import { CURRENCY_PAIRS } from '../common/constants/currency-pairs';
import { ICurrencyPair } from '../common/interfaces';
import { CurrencyPairPriceDto } from './dto/currency-pair-price.dto';
import { OnEvent } from '@nestjs/event-emitter';
import {
  CryptocompareService,
  ICryptocomparePriceMultiFullResponse,
} from '../cryptocompare/cryptocompare.service';
import { CurrencyCode } from '../common/enums/currency-code.enum';

@Injectable()
export class CurrencyService {
  private availableCurrencyPairs: ICurrencyPair[] = [];

  constructor(private cryptocompareService: CryptocompareService) {
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

  async getPricesMultiFull(
    fsyms: CurrencyCode[],
    tsyms: CurrencyCode[],
  ): Promise<ICryptocomparePriceMultiFullResponse> {
    const pricesMultiFull: ICryptocomparePriceMultiFullResponse = {
      RAW: {},
      DISPLAY: {},
    };

    for (const fsym of fsyms) {
      for (const tsym of tsyms) {
        // const pair = `${fsym}-${tsym}` as ICurrencyPair;
        // if (!this.currencyService.isCurrencyPairAvailable(pair)) {
        //   notAvailablePairs.push(pair);
        // }
      }
    }

    // TODO make request in DB

    return pricesMultiFull;
  }

  async updateCurrencyPrice(
    currencyPairPriceDto: CurrencyPairPriceDto,
  ): Promise<void> {
    // TODO make request in DB
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
