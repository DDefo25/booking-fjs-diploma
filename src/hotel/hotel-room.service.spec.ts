import { Test, TestingModule } from '@nestjs/testing';
import { HotelRoomService } from './hotel-room.service';

describe('HotelRoomService', () => {
  let service: HotelRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelRoomService],
    }).compile();

    service = module.get<HotelRoomService>(HotelRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
