import { ApiProperty } from '@nestjs/swagger';

// this DTO was created according https://min-api.cryptocompare.com/data/pricemultifull api returns in "DISPLAY" property
export class CryptocomparePriceDisplayDto {
  @ApiProperty()
  FROMSYMBOL: string;
  @ApiProperty()
  TOSYMBOL: string;
  @ApiProperty()
  MARKET: string;
  @ApiProperty()
  PRICE: string;
  @ApiProperty()
  LASTUPDATE: string;
  @ApiProperty()
  LASTVOLUME: string;
  @ApiProperty()
  LASTVOLUMETO: string;
  @ApiProperty()
  LASTTRADEID: string;
  @ApiProperty()
  VOLUMEDAY: string;
  @ApiProperty()
  VOLUMEDAYTO: string;
  @ApiProperty()
  VOLUME24HOUR: string;
  @ApiProperty()
  VOLUME24HOURTO: string;
  @ApiProperty()
  OPENDAY: string;
  @ApiProperty()
  HIGHDAY: string;
  @ApiProperty()
  LOWDAY: string;
  @ApiProperty()
  OPEN24HOUR: string;
  @ApiProperty()
  HIGH24HOUR: string;
  @ApiProperty()
  LOW24HOUR: string;
  @ApiProperty()
  LASTMARKET: string;
  @ApiProperty()
  VOLUMEHOUR: string;
  @ApiProperty()
  VOLUMEHOURTO: string;
  @ApiProperty()
  OPENHOUR: string;
  @ApiProperty()
  HIGHHOUR: string;
  @ApiProperty()
  LOWHOUR: string;
  @ApiProperty()
  TOPTIERVOLUME24HOUR: string;
  @ApiProperty()
  TOPTIERVOLUME24HOURTO: string;
  @ApiProperty()
  CHANGE24HOUR: string;
  @ApiProperty()
  CHANGEPCT24HOUR: string;
  @ApiProperty()
  CHANGEDAY: string;
  @ApiProperty()
  CHANGEPCTDAY: string;
  @ApiProperty()
  CHANGEHOUR: string;
  @ApiProperty()
  CHANGEPCTHOUR: string;
  @ApiProperty()
  CONVERSIONTYPE: string;
  @ApiProperty()
  CONVERSIONSYMBOL: string;
  @ApiProperty()
  SUPPLY: string;
  @ApiProperty()
  MKTCAP: string;
  @ApiProperty()
  MKTCAPPENALTY: string;
  @ApiProperty()
  CIRCULATINGSUPPLY: string;
  @ApiProperty()
  CIRCULATINGSUPPLYMKTCAP: string;
  @ApiProperty()
  TOTALVOLUME24H: string;
  @ApiProperty()
  TOTALVOLUME24HTO: string;
  @ApiProperty()
  TOTALTOPTIERVOLUME24H: string;
  @ApiProperty()
  TOTALTOPTIERVOLUME24HTO: string;
  @ApiProperty()
  IMAGEURL: string;
}
