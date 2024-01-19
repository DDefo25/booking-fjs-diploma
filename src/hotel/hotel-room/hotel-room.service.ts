import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomDocument } from '../schemas/hotel-room.schema';
import { Model, ObjectId } from 'mongoose';
import { IHotelRoomService } from '../interfaces/hotel-room.service.interface';
import { SearchRoomsParams } from '../interfaces/search-rooms.dto';

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

   search(params: SearchRoomsParams): Promise<HotelRoom[]> {
       return this.model.findOne(params)
   };

   update(id: ObjectId, data: Partial<HotelRoom>): Promise<HotelRoom> {
        return this.model.findByIdAndUpdate(id, {$set: data})
   }
}
