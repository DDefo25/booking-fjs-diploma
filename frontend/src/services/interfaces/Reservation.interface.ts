import { Hotel } from '../../components/HotelsModule/interfaces/Hotel.interface.dto';
import { HotelRoom } from '../../components/HotelsModule/interfaces/HotellRoom.interface.dto';


export interface Reservation {
  _id: string,
  dateStart: string,
  dateEnd: string,
  hotelRoom: HotelRoom,
  hotel: Hotel
}