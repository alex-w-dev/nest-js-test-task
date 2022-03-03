import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CurrencyCode } from '../common/enums/currency-code.enum';
import axios from 'axios';
import { CRYPTOCOMPARE_BASE_URL } from '../common/constants/cryptocompare-base-url';
import { CryptocomparePriceDisplayDto } from './dto/cryptocompare-price-display.dto';
import { CryptocomparePriceRawDto } from './dto/cryptocompare-price-raw.dto';

export type ICurrencyPairSyms = {
  fsyms: CurrencyCode[];
  tsyms: CurrencyCode[];
};

type ILimitedCurrencyPairs = Array<ICurrencyPairSyms>;

export type ICryptocomparePriceMultiFullResponse = {
  RAW: {
    [fsym: string]: {
      [tsym: string]: CryptocomparePriceRawDto;
    };
  };
  DISPLAY: {
    [fsym: string]: {
      [tsym: string]: CryptocomparePriceDisplayDto;
    };
  };
};

const FSYMS_MAX_LENGTH = 1000;
const TSYMS_MAX_LENGTH = 100;

function sliceByLength(
  arr: CurrencyCode[],
  maxLength: number,
): CurrencyCode[][] {
  let limited: CurrencyCode[] = [];
  const sliced: CurrencyCode[][] = [];

  for (const str of arr) {
    if ([...limited, str].join(',').length > maxLength) {
      sliced.push(limited);
      limited = [];
    } else {
      limited.push(str);
    }
  }

  if (limited.length) {
    sliced.push(limited);
  }

  return sliced;
}

@Injectable()
export class CryptocompareService {
  constructor(private configService: ConfigService) {}

  getLimitedPairs(
    fsyms: CurrencyCode[],
    tsyms: CurrencyCode[],
  ): ILimitedCurrencyPairs {
    const limited: ILimitedCurrencyPairs = [];

    const limitedFsyms = sliceByLength(fsyms, FSYMS_MAX_LENGTH);
    const limitedTsyms = sliceByLength(tsyms, TSYMS_MAX_LENGTH);

    for (const limitedFsym of limitedFsyms) {
      for (const limitedTsym of limitedTsyms) {
        limited.push({
          fsyms: limitedFsym,
          tsyms: limitedTsym,
        });
      }
    }

    return limited;
  }

  async getPriceMultiFull(
    fsyms: CurrencyCode[],
    tsyms: CurrencyCode[],
  ): Promise<ICryptocomparePriceMultiFullResponse> {
    const fsymsStr = fsyms.join(',');
    const tsymsStr = tsyms.join(',');

    if (!tsymsStr || !fsymsStr) return { RAW: {}, DISPLAY: {} };

    const { data } = await axios.get(
      `${CRYPTOCOMPARE_BASE_URL}/data/pricemultifull?fsyms=${fsymsStr}&tsyms=${tsymsStr}&api_key=${this.configService.get(
        'CRYPTOCOMPARE_API_KEY',
      )}`,
    );

    return data;
  }
}
