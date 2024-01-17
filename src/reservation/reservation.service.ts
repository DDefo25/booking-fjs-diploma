import { HttpException, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { ReservationCreateDto } from './interfaces/create-reservation.dto';
import { IReservationService } from './interfaces/reservation.service.interface';
import { ReservationSearchParams } from './interfaces/search-reservation.dto';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReservationService implements IReservationService {
    constructor (
        @InjectModel(Reservation.name) private readonly model: Model<ReservationDocument>
    ) {}

    addReservation(data: ReservationCreateDto): Promise<Reservation> {
        if(!this.hasReservation(data)) {
            throw new Error('Room is booked')
        }

        return this.model.create(data)
    };

    removeReservation(id: ObjectId): Promise<void> {
        return this.model.findByIdAndDelete(id)
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

        if (reservations.length > 0) {
            return true
        }
        return false
    }
}
