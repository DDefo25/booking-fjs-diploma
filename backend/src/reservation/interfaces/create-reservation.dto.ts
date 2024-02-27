import { IsDate, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ReservationCreateDto {
  @IsMongoId()
  user: ObjectId;

  @IsMongoId()
  hotel?: ObjectId;

  @IsMongoId()
  hotelRoom: ObjectId;

  @IsDate()
  dateStart: Date;

  @IsDate()
  dateEnd: Date;
}
