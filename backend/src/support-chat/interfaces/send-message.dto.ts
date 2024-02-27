import { IsDefined, IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class SendMessageDto {
  @IsMongoId()
  @IsDefined()
  author: ObjectId;

  @IsMongoId()
  @IsDefined()
  supportRequest: ObjectId;

  @IsString()
  @IsDefined()
  text: string;
}
