import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type HotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Hotel',
  })
  hotel: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({
    default: new Date(),
    required: true,
  })
  createdAt: Date;

  @Prop({
    default: new Date(),
    required: true,
  })
  updatedAt: Date;

  @Prop({ default: true })
  isEnabled: boolean;
}

const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);

HotelRoomSchema.pre('updateOne', function () {
  this.set({ updatedAt: new Date() });
});

export { HotelRoomSchema };
