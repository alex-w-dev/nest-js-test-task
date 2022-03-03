import { CurrencyCode } from '../enums/currency-code.enum';

export type IAppConfig = {
  currencyPairs: Array<{
    fsyms: CurrencyCode[];
    tsyms: CurrencyCode[];
    canBeMirrored?: boolean;
  }>;
};
