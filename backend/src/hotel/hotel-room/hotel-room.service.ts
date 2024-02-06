import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomDocument } from '../schemas/hotel-room.schema';
import { Model, ObjectId } from 'mongoose';
import { IHotelRoomService } from '../interfaces/hotel-room.service.interface';
import { SearchRoomsParams } from '../interfaces/search-rooms.dto';
import { match } from 'assert';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
    constructor(
        @InjectModel(HotelRoom.name) private readonly model: Model<HotelRoomDocument>
   ) {}

   create(data: Partial<HotelRoom>): Promise<HotelRoom> {
       return this.model.create(data)
   };

   findById(id: ObjectId): Promise<HotelRoom> {
       return this.model.findById(id)
   };

   async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
        const {limit, offset, title, ...filter} = params
        const match: { title?: RegExp } = {}
        if (title) {
            const titleRegExp = new RegExp(title, 'i')
            match.title = titleRegExp
        }

        return this.model.find(filter)
                .populate({path: 'hotel', match})
                .limit(limit)
                .skip(offset)
                .then((hotelRooms) => hotelRooms
                    .filter(el => el.hotel !== null));
   };

   update(id: ObjectId, data: Partial<HotelRoom>): Promise<HotelRoom> {
        return this.model.findByIdAndUpdate(id, {$set: data}, {returnDocument: 'after'})
   }
}
