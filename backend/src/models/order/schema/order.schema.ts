import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Food } from '../../food/schema/food.schema';

export type OrderDocument = Order & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Order {
    @Prop({ required: true })
    orderItems: Food[];

    @Prop({ required: false })
    notes: string[];

    @Prop({ required: true })
    status: boolean;

    @Prop({ required: false })
    discount?: number;

    @Prop({ required: true })
    takeaway: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
