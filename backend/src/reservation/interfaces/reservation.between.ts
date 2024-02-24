import { IsDate, IsMongoId, IsString} from "class-validator";
import { ObjectId } from "mongoose";

export class ReservationBetweenRequestDto  {
    @IsString()
    startDate: string

    @IsString()
    endDate: string;
}