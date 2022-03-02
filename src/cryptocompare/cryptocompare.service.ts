import { Injectable } from '@nestjs/common';
import { CURRENCY_PAIRS } from '../common/constants/currency-pairs';
import { ICurrencyPair } from '../common/interfaces';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CryptocompareService {
  constructor() {}
}
