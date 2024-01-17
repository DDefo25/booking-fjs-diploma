import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop( {required: true})
    userId: ObjectId;

    @Prop( {required: true})
    hotelId: ObjectId;

    @Prop( {required: true})
    roomId: ObjectId;

    @Prop( {required: true})
    dateStart: Date;

    @Prop( {required: true})
    dateEnd: Date;
}

const ReservationSchema = SchemaFactory.createForClass(Reservation);

export { ReservationSchema }