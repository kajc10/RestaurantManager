import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Food } from 'src/models/food/schema/food.schema';

export type OrderDocument = Order & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Order {
    @Prop({ required: true, immutable: true })
    id: string;

    @Prop({ required: true })
    orderItems: Food[];

    @Prop({ required: true })
    status: boolean;

    @Prop({ required: false })
    discount?: number;

    @Prop({ required: true })
    takeaway: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
