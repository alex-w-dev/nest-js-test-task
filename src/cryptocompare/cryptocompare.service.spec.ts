import { Test, TestingModule } from '@nestjs/testing';
import { CryptocompareService } from './cryptocompare.service';

describe('CryptocompareService', () => {
  let service: CryptocompareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptocompareService],
    }).compile();

    service = module.get<CryptocompareService>(CryptocompareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
