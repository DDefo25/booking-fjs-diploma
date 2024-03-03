import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class SearchHotelParams {
  @IsNumber()
  @IsDefined()
  @Transform(({ value }) => Number(value))
  limit: number;

  @IsNumber()
  @IsDefined()
  @Transform(({ value }) => Number(value))
  offset: number;

  @IsString()
  @IsDefined()
  title: string;
}
