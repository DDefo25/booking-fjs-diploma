import { Schema as MongooseSchema } from 'mongoose';

export interface objectId {
  id: MongooseSchema.Types.ObjectId;
}
