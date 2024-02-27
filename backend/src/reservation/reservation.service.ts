import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { ReservationCreateDto } from './interfaces/create-reservation.dto';
import { IReservationService } from './interfaces/reservation.service.interface';
import { ReservationSearchParams } from './interfaces/search-reservation.dto';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  HotelRoom,
  HotelRoomDocument,
} from 'src/hotel/schemas/hotel-room.schema';
import { ReservationBetweenDto } from './interfaces/reservation.between.dto';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly model: Model<ReservationDocument>,
    @InjectModel(HotelRoom.name)
    private readonly modelHotelRomm: Model<HotelRoomDocument>,
  ) {}

  async addReservation(data: ReservationCreateDto): Promise<Reservation> {
    const { hotelRoom: hotelRoomId } = data;

    //проверка на существование комнаты отеля и отсутствия бронирования этой комнаты на датах
    const hotelRoom = await this.modelHotelRomm.findById(hotelRoomId);
    const isReserved = await this.hasReservation(data);

    if (isReserved || !hotelRoom || !hotelRoom.isEnabled) {
      throw new BadRequestException(
        'Номер с указанным ID не существует или он отключён',
      );
    }

    return (
      await this.model.create({ hotel: hotelRoom?.hotel, ...data })
    ).populate(['hotel', 'hotelRoom']);
  }

  async removeReservation(id: ObjectId, user?: any): Promise<void> {
    const reservation = await this.model.findById(id);

    if (!reservation) {
      throw new BadRequestException('Брони с указанным ID не существует');
    } else if (user && reservation.user.toString() !== user._id?.toString()) {
      throw new BadRequestException(
        'ID текущего пользователя не совпадает с ID пользователя в брони',
      );
    }
    await reservation.deleteOne();
  }

  getReservations(
    filter: ReservationSearchParams,
  ): Promise<Array<Reservation>> {
    return this.model.find(filter).populate(['hotel', 'hotelRoom']);
  }

  getReservationsBetweenDates(
    data: ReservationBetweenDto,
  ): Promise<Reservation[]> {
    const { dateStart, dateEnd } = data;
    return this.model
      .aggregate([
        {
          $match: {
            $or: [
              {
                dateStart: {
                  $gte: dateStart,
                  $lt: dateEnd,
                },
              },
              {
                dateEnd: {
                  $gt: dateStart,
                  $lte: dateEnd,
                },
              },
            ],
          },
        },
      ])
      .group({
        _id: '$hotelRoom',
        hotel: { $first: '$hotel' },
        reservations: { $push: '$$ROOT' },
      });
  }

  private async hasReservation(data: ReservationCreateDto): Promise<boolean> {
    const { hotelRoom, dateStart, dateEnd } = data;
    const reservations = await this.model.find({
      hotelRoom,
      $or: [
        {
          dateStart: {
            $gte: dateStart,
            $lt: dateEnd,
          },
        },
        {
          dateEnd: {
            $gt: dateStart,
            $lte: dateEnd,
          },
        },
      ],
    });

    return reservations.length > 0;
  }
}
