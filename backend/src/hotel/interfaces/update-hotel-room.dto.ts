import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import mongoose, { ObjectId } from 'mongoose';

export class UpdateHotelRoomDto {
  @IsString()
  @IsDefined()
  description: string;

  @IsString()
  @IsDefined()
  title: string;

  @IsObjectId()
  @IsDefined()
  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  hotel: ObjectId;

  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;

  @IsOptional()
  imagesFiles: Express.Multer.File[];

  @IsString({ each: true })
  @IsDefined()
  images: string[];
}
