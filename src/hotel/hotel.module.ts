import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './hotel-room/hotel-room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';
import { HotelController } from './hotel.controller';
import { HotelRoomController } from './hotel-room/hotel-room.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Hotel.name, schema: HotelSchema},
      {name: HotelRoom.name, schema: HotelRoomSchema}
  ]),
  ],
  providers: [
    HotelService, 
    HotelRoomService
  ],
  controllers: [
    HotelController,
    HotelRoomController
  ]
})
export class HotelModule {}
