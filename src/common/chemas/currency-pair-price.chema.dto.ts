import { SchemaFactory } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { CurrencyPairPriceDto } from '../../currency/dto/currency-pair-price.dto';

export type ICurrencyPairPriceDocument = CurrencyPairPriceDto & Document;
export type ICurrencyPairPriceModel = Model<ICurrencyPairPriceDocument>;

export const CurrencyPairPriceSchema =
  SchemaFactory.createForClass(CurrencyPairPriceDto);
