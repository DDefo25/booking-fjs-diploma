import {
  IsBoolean,
  IsDefined,
  IsMongoId,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetChatListParams {
  @IsMongoId()
  @IsOptional()
  user?: ObjectId;

  @IsBoolean()
  @IsDefined()
  isActive: boolean;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;
}
