import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import mongoose, { ObjectId } from 'mongoose';

export class SearchRoomsParams {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  offset: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsObjectId()
  @IsOptional()
  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  hotel: ObjectId;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => !!Number(value))
  isEnabled?: boolean;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  dateStart?: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  dateEnd?: Date;
}
