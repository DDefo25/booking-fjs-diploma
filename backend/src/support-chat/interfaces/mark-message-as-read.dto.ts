import { IsDate, IsDefined, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class MarkMessageAsReadDto {
  @IsMongoId()
  @IsDefined()
  user: ObjectId;

  @IsMongoId()
  @IsDefined()
  supportRequest: ObjectId;

  @IsDate()
  @IsDefined()
  createdBefore: Date;
}
