import { Response, Request } from 'express';
import { CurrencyCode } from '../enums/currency-code.enum';

export type IResponse = Response;
export type IRequest = Request;

export type ICurrencyPair = `${CurrencyCode}-${CurrencyCode}`;
