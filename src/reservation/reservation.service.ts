import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { ReservationCreateDto } from './interfaces/create-reservation.dto';
import { IReservationService } from './interfaces/reservation.service.interface';
import { ReservationSearchParams } from './interfaces/search-reservation.dto';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomDocument } from 'src/hotel/schemas/hotel-room.schema';

@Injectable()
export class ReservationService implements IReservationService {
    constructor (
        @InjectModel(Reservation.name) private readonly model: Model<ReservationDocument>,
        @InjectModel(HotelRoom.name) private readonly modelHotelRomm: Model<HotelRoomDocument>
    ) {}

    async addReservation(data: ReservationCreateDto): Promise<Reservation> {
        const { roomId } = data

        const hotelRoom = await this.modelHotelRomm.findById(roomId)
        const isReserved = await this.hasReservation(data)

        if(isReserved || !hotelRoom || !hotelRoom.isEnabled) {
            throw new BadRequestException('Номер с указанным ID не существует или он отключён')
        }

        return this.model.create({hotelId: hotelRoom?.hotel, ...data})
    };

    async removeReservation(id: ObjectId, userId?: any): Promise<void> {
        const reservation = await this.model.findById(id)

        if (!reservation) {
            throw new BadRequestException('Брони с указанным ID не существует')
        } else if (reservation.userId.toString() !== userId?._id.toString()) {
            throw new BadRequestException('ID текущего пользователя не совпадает с ID пользователя в брони')
        }
        await reservation.deleteOne()
    };

    getReservations(filter: ReservationSearchParams): Promise<Array<Reservation>> {
        return this.model.find(filter)
    };

    private async hasReservation(data: ReservationCreateDto): Promise<boolean> {
        const {roomId, dateStart, dateEnd} = data;
        const reservations = await this.model.find({
            roomId,
            dateStart: {
                $gte: dateStart,
                $lte: dateEnd},
            dateEnd:{
                $gte: dateStart,
                $lte: dateEnd}
        })

        return reservations.length > 0
    }
}
