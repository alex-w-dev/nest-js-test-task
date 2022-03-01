import { Test, TestingModule } from '@nestjs/testing';
import { CryptocompareController } from './cryptocompare.controller';

describe('CryptocompareController', () => {
  let controller: CryptocompareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptocompareController],
    }).compile();

    controller = module.get<CryptocompareController>(CryptocompareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
