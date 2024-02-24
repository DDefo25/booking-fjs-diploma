import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomDocument } from '../schemas/hotel-room.schema';
import mongoose, { Model, ObjectId as ObjectIdType } from 'mongoose';
import { IHotelRoomService } from '../interfaces/hotel-room.service.interface';
import { SearchRoomsParams } from '../interfaces/search-rooms.dto';
import { match } from 'assert';
import { UpdateHotelRoomDto } from '../interfaces/update-hotel-room.dto';
import { UpdateHotelRoomParams } from '../interfaces/update-hotel-room.params';
import { ReservationService } from 'src/reservation/reservation.service';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
    constructor(
        @InjectModel(HotelRoom.name) private readonly model: Model<HotelRoomDocument>,
        private readonly reservationService: ReservationService,
   ) {}

   create(data: Partial<HotelRoom>): Promise<HotelRoom> {
       return this.model.create(data)
   };

   findById(id: ObjectIdType): Promise<HotelRoom> {
       return this.model.findById(id)
   };

   async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
        const { 
            limit, 
            offset, 
            title = '', 
            dateStart, 
            dateEnd, 
            hotel, 
            isEnabled = true } = params
        console.log(params)

        const titleRegExp = new RegExp(title, 'i')
        const reservationBetweenDates = await this.reservationService.getReservationsBetweenDates({dateStart, dateEnd})
        const hotelRoomsReserved = reservationBetweenDates.map( el => el['_id'])

        return this.model.aggregate([
            { $lookup: {
                from: 'hotels',
                localField: 'hotel',
                foreignField: '_id',
                as: 'hotel' }},
            { $unwind: '$hotel' },
            { $match: { 
                $or: [
                    { 'hotel._id': hotel },
                    { 'hotel.title': { $regex: titleRegExp } }
                ],
                isEnabled,
                _id: { $nin: hotelRoomsReserved }}},
            { $group: {
                _id: '$hotel._id',
                hotel: { $first: '$hotel'},
                hotelRooms: { $push: "$$ROOT" }}},
            { $skip: offset },
            { $limit: limit }
        ])
   };

   update(id: ObjectIdType, data: UpdateHotelRoomParams): Promise<HotelRoom> {
        return this.model.findByIdAndUpdate(id, {$set: data}, {returnDocument: 'after'})
   }
}
