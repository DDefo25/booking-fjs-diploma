import { IsDate, IsMongoId, IsString} from "class-validator";
import { ObjectId } from "mongoose";

export class ReservationCreateRequestDto  {
    @IsMongoId()
    hotelRoom: ObjectId;

    @IsString()
    startDate: string

    @IsString()
    endDate: string;
}