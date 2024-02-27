import { IsBoolean, IsDefined, IsMongoId, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateHotelRoomParams {
  @IsString()
  @IsDefined()
  description: string;

  @IsString()
  @IsDefined()
  title: string;

  @IsMongoId()
  @IsDefined()
  hotel: Schema.Types.ObjectId;

  @IsBoolean()
  @IsDefined()
  isEnabled?: boolean;

  @IsString()
  @IsDefined()
  images: string[];
}
