import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequestController } from './support-request.controller';

describe('SupportRequestController', () => {
  let controller: SupportRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportRequestController],
    }).compile();

    controller = module.get<SupportRequestController>(SupportRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
