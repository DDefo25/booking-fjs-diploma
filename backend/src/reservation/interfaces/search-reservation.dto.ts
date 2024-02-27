import { IsDate, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ReservationSearchParams {
  @IsMongoId()
  user?: ObjectId;

  @IsDate()
  dateStart?: Date;

  @IsDate()
  dateEnd?: Date;
}
