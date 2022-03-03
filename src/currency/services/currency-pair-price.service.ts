import { Injectable } from '@nestjs/common';
import { CurrencyPairPriceDto } from '../dto/currency-pair-price.dto';
import {
  CryptocompareService,
  ICryptocomparePriceMultiFullResponse,
} from '../../cryptocompare/cryptocompare.service';
import { CurrencyCode } from '../../common/enums/currency-code.enum';
import { InjectModel } from '@nestjs/mongoose';
import { ICurrencyPairPriceModel } from '../../common/chemas/currency-pair-price.chema.dto';
import { FilterQuery } from 'mongoose';
import { set } from 'lodash';
import { CurrencyPairConfigService } from './currency-pair-config.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CurrencyPairPriceService {
  static convertCurrencyPairPricesToCryptocomareResponce(
    currencyPairPrices: CurrencyPairPriceDto[],
  ): ICryptocomparePriceMultiFullResponse {
    const pricesMultiFull: ICryptocomparePriceMultiFullResponse = {
      RAW: {},

      DISPLAY: {},
    };

    currencyPairPrices.forEach((price) => {
      set(pricesMultiFull.RAW, `${price.fsym}.${price.tsym}`, price.raw);
      set(
        pricesMultiFull.DISPLAY,
        `${price.fsym}.${price.tsym}`,
        price.display,
      );
    });

    return pricesMultiFull;
  }

  constructor(
    private currencyPairConfigService: CurrencyPairConfigService,
    @InjectModel(CurrencyPairPriceDto.name)
    private currencyPairPriceModel: ICurrencyPairPriceModel,
    private cryptocompareService: CryptocompareService,
    private eventEmitter: EventEmitter2,
  ) {}

  async updateAllAccordingCryptocompare() {
    const currencyPairsAsSyms =
      this.currencyPairConfigService.getAllAvailableCurrencyPairsAsSyms();

    const limited = this.cryptocompareService.getLimitedPairs(
      currencyPairsAsSyms.fsyms,
      currencyPairsAsSyms.tsyms,
    );

    for (const currencyPairSyms of limited) {
      const cryptocompareResult =
        await this.cryptocompareService.getPriceMultiFull(
          currencyPairSyms.fsyms,
          currencyPairSyms.tsyms,
        );

      for (const [fsym, toPrices] of Object.entries(cryptocompareResult.RAW)) {
        for (const [tsym, raw] of Object.entries(toPrices)) {
          await this.upsertCurrencyPriceData({
            fsym: fsym as CurrencyCode,
            tsym: tsym as CurrencyCode,
            raw,
            display: cryptocompareResult.DISPLAY?.[fsym]?.[tsym],
          });
        }
      }
    }
  }

  async getCryptocomparePricesMultiFull(
    fsyms: CurrencyCode[],
    tsyms: CurrencyCode[],
  ): Promise<ICryptocomparePriceMultiFullResponse> {
    if (!fsyms.length || !tsyms.length) {
      return null;
    }

    const $or: FilterQuery<CurrencyPairPriceDto>['$or'] = [];
    for (const fsym of fsyms) {
      for (const tsym of tsyms) {
        $or.push({
          fsym,
          tsym,
        });
      }
    }
    const currencyPairPrices = await this.currencyPairPriceModel.find({ $or });

    return CurrencyPairPriceService.convertCurrencyPairPricesToCryptocomareResponce(
      currencyPairPrices,
    );
  }

  async upsertCurrencyPriceData(
    currencyPairPrice: CurrencyPairPriceDto,
  ): Promise<void> {
    await this.currencyPairPriceModel.updateOne(
      {
        fsym: currencyPairPrice.fsym,
        tsym: currencyPairPrice.tsym,
      },
      {
        $set: {
          raw: currencyPairPrice.raw,
          display: currencyPairPrice.display,
        },
      },
      {
        upsert: true,
      },
    );
    this.eventEmitter.emit('currency-pair.update', currencyPairPrice);
  }
}
