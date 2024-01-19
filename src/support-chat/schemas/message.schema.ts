import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop( {
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'User'
    })
    author: ObjectId;

    @Prop({required: true})
    sentAt: Date;

    @Prop( {required: true})
    text: string;

    @Prop()
    readAt: Date;
}

const MessageSchema = SchemaFactory.createForClass(Message);

export { MessageSchema }