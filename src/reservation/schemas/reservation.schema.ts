import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop( {
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'User'
    })
    userId: ObjectId;

    @Prop( {
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Hotel'
    })
    hotelId: ObjectId;

    @Prop( {
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'HotelRoom'
    })
    roomId: ObjectId;

    @Prop( {required: true})
    dateStart: Date;

    @Prop( {required: true})
    dateEnd: Date;
}

const ReservationSchema = SchemaFactory.createForClass(Reservation);

export { ReservationSchema }