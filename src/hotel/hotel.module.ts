import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './hotel-room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';

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
  ]
})
export class HotelModule {}
