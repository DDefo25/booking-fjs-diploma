import { Module, forwardRef } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { ReservationController } from './reservation.controller';
import { HotelRoom, HotelRoomSchema } from 'src/hotel/schemas/hotel-room.schema';
import { HotelModule } from 'src/hotel/hotel.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Reservation.name, schema: ReservationSchema},
      {name: HotelRoom.name, schema: HotelRoomSchema}
    ]),
  ],
  providers: [ReservationService],
  controllers: [ReservationController],
  exports: [ReservationService]
})
export class ReservationModule {}
