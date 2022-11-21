import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodDocument = Food & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Food {
    @Prop({ required: true})
    name: string;

    @Prop({ required: true})
    type: string;

    @Prop({ required: true })
    price: number;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
