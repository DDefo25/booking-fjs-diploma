import { Transform } from 'class-transformer';
import { IsDate, IsDefined } from 'class-validator';

export class ReservationBetweenDto {
  @IsDate()
  @IsDefined()
  @Transform(({ value }) => new Date(value))
  dateStart: Date;

  @IsDate()
  @IsDefined()
  @Transform(({ value }) => new Date(value))
  dateEnd: Date;
}
