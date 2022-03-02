import { ApiProperty } from '@nestjs/swagger';
import { CurrencyCode } from '../../common/enums/currency-code.enum';

// this DTO was created according https://min-api.cryptocompare.com/data/pricemultifull api returns in "RAW" property
export class CryptocomparePriceRawDto {
  @ApiProperty()
  TYPE: string;
  @ApiProperty()
  MARKET: string;
  @ApiProperty({
    enum: CurrencyCode,
  })
  FROMSYMBOL: CurrencyCode;
  @ApiProperty({
    enum: CurrencyCode,
  })
  TOSYMBOL: CurrencyCode;
  @ApiProperty()
  FLAGS: string;
  @ApiProperty()
  PRICE: number;
  @ApiProperty()
  LASTUPDATE: number;
  @ApiProperty()
  MEDIAN: number;
  @ApiProperty()
  LASTVOLUME: number;
  @ApiProperty()
  LASTVOLUMETO: number;
  @ApiProperty()
  LASTTRADEID: string;
  @ApiProperty()
  VOLUMEDAY: number;
  @ApiProperty()
  VOLUMEDAYTO: number;
  @ApiProperty()
  VOLUME24HOUR: number;
  @ApiProperty()
  VOLUME24HOURTO: number;
  @ApiProperty()
  OPENDAY: number;
  @ApiProperty()
  HIGHDAY: number;
  @ApiProperty()
  LOWDAY: number;
  @ApiProperty()
  OPEN24HOUR: number;
  @ApiProperty()
  HIGH24HOUR: number;
  @ApiProperty()
  LOW24HOUR: number;
  @ApiProperty()
  LASTMARKET: string;
  @ApiProperty()
  VOLUMEHOUR: number;
  @ApiProperty()
  VOLUMEHOURTO: number;
  @ApiProperty()
  OPENHOUR: number;
  @ApiProperty()
  HIGHHOUR: number;
  @ApiProperty()
  LOWHOUR: number;
  @ApiProperty()
  TOPTIERVOLUME24HOUR: number;
  @ApiProperty()
  TOPTIERVOLUME24HOURTO: number;
  @ApiProperty()
  CHANGE24HOUR: number;
  @ApiProperty()
  CHANGEPCT24HOUR: number;
  @ApiProperty()
  CHANGEDAY: number;
  @ApiProperty()
  CHANGEPCTDAY: number;
  @ApiProperty()
  CHANGEHOUR: number;
  @ApiProperty()
  CHANGEPCTHOUR: number;
  @ApiProperty()
  CONVERSIONTYPE: string;
  @ApiProperty()
  CONVERSIONSYMBOL: string;
  @ApiProperty()
  SUPPLY: number;
  @ApiProperty()
  MKTCAP: number;
  @ApiProperty()
  MKTCAPPENALTY: number;
  @ApiProperty()
  CIRCULATINGSUPPLY: number;
  @ApiProperty()
  CIRCULATINGSUPPLYMKTCAP: number;
  @ApiProperty()
  TOTALVOLUME24H: number;
  @ApiProperty()
  TOTALVOLUME24HTO: number;
  @ApiProperty()
  TOTALTOPTIERVOLUME24H: number;
  @ApiProperty()
  TOTALTOPTIERVOLUME24HTO: number;
  @ApiProperty()
  IMAGEURL: string;
}
