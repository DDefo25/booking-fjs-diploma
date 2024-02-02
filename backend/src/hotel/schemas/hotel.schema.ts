import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
    @Prop( {required: true})
    title: string;

    @Prop()
    description: string;
}

const HotelSchema = SchemaFactory.createForClass(Hotel);

export { HotelSchema }

//Добавить images гостиницы