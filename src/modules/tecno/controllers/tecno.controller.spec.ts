import { Test, TestingModule } from '@nestjs/testing';
import { TecnoController } from './tecno.controller';

describe('TecnoController', () => {
  let controller: TecnoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TecnoController],
    }).compile();

    controller = module.get<TecnoController>(TecnoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
