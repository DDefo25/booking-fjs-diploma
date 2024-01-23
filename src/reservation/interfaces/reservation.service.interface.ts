import { ObjectId } from "mongoose";
import { ReservationSearchParams } from "./search-reservation.dto";
import { ReservationCreateDto } from "./create-reservation.dto";
import { Reservation } from "../schemas/reservation.schema";

export interface IReservationService {
    addReservation(data: ReservationCreateDto): Promise<Reservation>;
    removeReservation(id: ObjectId, userId?: any): Promise<void>;
    getReservations(filter: ReservationSearchParams): Promise<Array<Reservation>>;
}