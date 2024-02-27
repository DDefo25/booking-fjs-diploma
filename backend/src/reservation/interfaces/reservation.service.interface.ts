import { ObjectId } from 'mongoose';
import { ReservationSearchParams } from './search-reservation.dto';
import { ReservationCreateDto } from './create-reservation.dto';
import { Reservation } from '../schemas/reservation.schema';
import { ReservationBetweenDto } from './reservation.between.dto';

export interface IReservationService {
  addReservation(data: ReservationCreateDto): Promise<Reservation>;
  removeReservation(id: ObjectId, user?: any): Promise<void>;
  getReservations(filter: ReservationSearchParams): Promise<Reservation[]>;
  getReservationsBetweenDates(
    data: ReservationBetweenDto,
  ): Promise<Reservation[]>;
}
