import { ObjectId } from "mongoose";
import { HotelRoom } from "../schemas/hotel-room.schema";
import { SearchRoomsParams } from "./search-rooms.dto";

export interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ObjectId): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ObjectId, data: Partial<HotelRoom>): Promise<HotelRoom>;
}