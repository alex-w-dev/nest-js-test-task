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

@Injectable()
export class CurrencyPairPriceService {
  constructor(
    private currencyPairConfigService: CurrencyPairConfigService,
    @InjectModel(CurrencyPairPriceDto.name)
    private currencyPairPriceModel: ICurrencyPairPriceModel,
    private cryptocompareService: CryptocompareService,
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
    const pricesMultiFull: ICryptocomparePriceMultiFullResponse = {
      RAW: {},
      DISPLAY: {},
    };

    if (!fsyms.length || !tsyms.length) {
      return pricesMultiFull;
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
  }
}
