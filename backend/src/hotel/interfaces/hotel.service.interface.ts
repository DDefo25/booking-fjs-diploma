import { ObjectId } from 'mongoose';
import { Hotel } from '../schemas/hotel.schema';
import { SearchHotelParams } from './search-hotel.dto';
import { UpdateHotelParams } from './update-hotel.dto';

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ObjectId): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: ObjectId, data: UpdateHotelParams): Promise<Hotel>;
}
