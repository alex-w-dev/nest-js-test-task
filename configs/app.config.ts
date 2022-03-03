import { CurrencyCode } from '../src/common/enums/currency-code.enum';
import { IAppConfig } from '../src/common/interfaces/app.config';

export const AppConfig: IAppConfig = {
  currencyPairs: [
    {
      fsyms: [CurrencyCode.EUR, CurrencyCode.USD, CurrencyCode.RUB],
      tsyms: [CurrencyCode.EUR, CurrencyCode.USD, CurrencyCode.RUB],
      canBeMirrored: true,
    },
    {
      fsyms: [CurrencyCode.ETH, CurrencyCode.BTC],
      tsyms: [CurrencyCode.EUR, CurrencyCode.USD, CurrencyCode.RUB],
    },
    {
      fsyms: [CurrencyCode.FLT, CurrencyCode.GDC],
      tsyms: [CurrencyCode.RUB],
      canBeMirrored: true,
    },
  ],
};
