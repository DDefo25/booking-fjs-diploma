import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './hotel-room/hotel-room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';
import { HotelController } from './hotel.controller';
import { HotelRoomController } from './hotel-room/hotel-room.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/config/multer-config/multer-config.service';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),

    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    ReservationModule,
  ],
  providers: [HotelService, HotelRoomService],
  controllers: [HotelController, HotelRoomController],
})
export class HotelModule {}
