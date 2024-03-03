import { Injectable } from '@nestjs/common';
import { IHotelService } from './interfaces/hotel.service.interface';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { Model, ObjectId } from 'mongoose';
import { SearchHotelParams } from './interfaces/search-hotel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateHotelParams } from './interfaces/update-hotel.dto';
import { match } from 'assert';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private readonly model: Model<HotelDocument>,
  ) {}

  create(data: Partial<Hotel>): Promise<Hotel> {
    return this.model.create(data);
  }

  findById(id: ObjectId): Promise<Hotel> {
    return this.model.findById(id);
  }

  search(params: SearchHotelParams): Promise<Hotel[]> {
    const { limit, offset, title } = params || ({} as SearchHotelParams);

    const filter = {
      title: new RegExp(title, 'i'),
    };
    
    return this.model.aggregate([
      { $match: {
        ...filter
      }},
      { $group: {
          _id: null,
          hotels: { $push: "$$ROOT" }
        }
      },
      { $project: {
        count: { $size: '$hotels' },
        hotels: { $slice: ['$hotels', offset, limit ]},
        _id: 0
      }}
    ]).then(result => result[0])
  }

  update(id: ObjectId, data: UpdateHotelParams): Promise<Hotel> {
    return this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: 'after' },
    );
  }
}
