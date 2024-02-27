import { IsDefined, IsMongoId, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetMessagesParams {
  @IsMongoId()
  @IsDefined()
  _id: ObjectId;

  @IsMongoId()
  @IsOptional()
  user?: ObjectId;
}
