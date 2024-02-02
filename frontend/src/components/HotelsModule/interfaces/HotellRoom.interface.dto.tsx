import { IHotel } from "./Hotel.interface.dto";

export interface IHotelRoom {
  _id: string,
  description: string,
  images: string[],
  isEnabled: boolean,
  hotel: IHotel
}