import { Test, TestingModule } from '@nestjs/testing';
import { HotelRoomController } from './hotel-room.controller';

describe('HotelRoomController', () => {
  let controller: HotelRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelRoomController],
    }).compile();

    controller = module.get<HotelRoomController>(HotelRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
