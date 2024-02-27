import { IsDefined, IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateSupportRequestDto {
  @IsMongoId()
  @IsDefined()
  user: ObjectId;

  @IsString()
  @IsDefined()
  text: string;
}
