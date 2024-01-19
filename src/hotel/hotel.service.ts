import { Injectable } from '@nestjs/common';
import { IHotelService } from './interfaces/hotel.service.interface';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { Model, ObjectId } from 'mongoose';
import { SearchHotelParams } from './interfaces/search-hotel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateHotelParams } from './interfaces/update-hotel.dto';

@Injectable()
export class HotelService implements IHotelService {
    constructor(
        @InjectModel(Hotel.name) private readonly model: Model<HotelDocument>
   ) {}

   create(data: Partial<Hotel>): Promise<Hotel> {
       return this.model.create(data)
   };

   findById(id: ObjectId): Promise<Hotel> {
       return this.model.findById(id)
   };

   search(params: SearchHotelParams): Promise<Hotel[]> {
        const {limit, offset, title} = params
        const filter = title ? { title } : {};
       return this.model.find(filter).limit(limit).skip(offset)
   };

   update(id: ObjectId, data: UpdateHotelParams): Promise<Hotel> {
        return this.model.findByIdAndUpdate(id, {$set: data}, {returnDocument: 'after'})
   }
}
