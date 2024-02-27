import {
  IsBoolean,
  IsDefined,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateHotelRoomDto {
  @IsString()
  @IsDefined()
  description: string;

  @IsString()
  @IsDefined()
  title: string;

  @IsMongoId()
  @IsDefined()
  hotel: ObjectId;

  @IsBoolean()
  @IsDefined()
  isEnabled?: boolean;

  @IsOptional()
  imagesFiles: Express.Multer.File[];

  @IsString()
  @IsDefined()
  images: string[];
}
