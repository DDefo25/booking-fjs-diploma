import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type SupportRequestDocument = SupportRequest & Document;

@Schema({ timestamps: true })
export class SupportRequest {
    @Prop( {required: true})
    user: ObjectId;

    @Prop({required: true})
    createdAt: Date;

    @Prop()
    messages: [{
        type: MongooseSchema.Types.ObjectId,
        ref: 'Message'}];

    @Prop()
    isActive: boolean;
}

const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);

export { SupportRequestSchema }