import { Transform } from 'class-transformer';
import { IsDate, IsDefined, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ReservationCreateRequestDto {
  @IsMongoId()
  @IsDefined()
  hotelRoom: ObjectId;

  @IsDate()
  @IsDefined()
  @Transform(({ value }) => new Date(value))
  dateStart: Date;

  @IsDate()
  @IsDefined()
  @Transform(({ value }) => new Date(value))
  dateEnd: Date;
}
