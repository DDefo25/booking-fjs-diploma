import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
    @Prop( {required: true})
    title: ObjectId;

    @Prop()
    description: string;

    @Prop({
        // default: new Date(),
        required: true})
    createdAt: Date;

    @Prop({
        // default: new Date(),
        required: true})
    updatedAt: Date;
}

const HotelSchema = SchemaFactory.createForClass(Hotel);

// HotelSchema.pre('updateOne', function() {
//   this.set({ updatedAt: new Date() });
// });

export { HotelSchema }