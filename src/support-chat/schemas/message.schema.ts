import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop( {required: true})
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