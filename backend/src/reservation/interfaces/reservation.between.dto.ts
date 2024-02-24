import { IsDate, IsMongoId, IsString} from "class-validator";
import { ObjectId } from "mongoose";

export class ReservationBetweenDto  {
    @IsDate()
    dateStart: Date

    @IsDate()
    dateEnd: Date;
}