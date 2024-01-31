import { IsDate, IsMongoId} from "class-validator";
import { ObjectId } from "mongoose";

export class ReservationCreateDto  {
    @IsMongoId()
    userId: ObjectId;

    @IsMongoId()
    hotelId?: ObjectId;

    @IsMongoId()
    roomId: ObjectId;

    @IsDate()
    dateStart: Date;

    @IsDate()
    dateEnd: Date;
}