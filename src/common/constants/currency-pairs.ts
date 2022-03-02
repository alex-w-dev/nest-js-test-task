// this constant is can be a database collection after CRUD & CORS completed
// we can read data from process.env and parse it for creating this.array
import { ICurrencyPair } from '../interfaces';
export const CURRENCY_PAIRS: ICurrencyPair[] = [
  'BTC-EUR',
  'BTC-RUB',
  'BTC-USD',
];
