import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Reservation {
    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    numberOfPeople: number;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    contact: string;

    @Prop({ required: false })
    notes?: string[];
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
