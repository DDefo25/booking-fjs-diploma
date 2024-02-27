import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type SupportRequestDocument = SupportRequest & Document;

@Schema({ timestamps: true })
export class SupportRequest {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  user: ObjectId;

  @Prop()
  messages: [
    {
      type: MongooseSchema.Types.ObjectId;
      ref: 'Message';
    },
  ];

  @Prop({ default: true })
  isActive: boolean;
}

const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);

export { SupportRequestSchema };
