import { Hotel } from './Hotel.interface.dto';

export interface HotelRoom {
  _id: string,
  title: string
  description: string,
  images: string[],
  isEnabled: boolean,
  hotel: Hotel
}