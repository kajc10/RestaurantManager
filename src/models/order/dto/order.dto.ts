import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Schema } from 'mongoose';
import { TransformObjectIdToString } from 'src/common/decorators/transform-objectid-to-string';
import { Food } from 'src/models/food/schema/food.schema';

@Exclude()
export class OrderDto {
    @Expose({ name: 'id' })
    @TransformObjectIdToString()
    @ApiProperty({ name: 'id', type: String })
    _id: Schema.Types.ObjectId;

    @ApiProperty()
    @Expose()
    orderItems: Food[]; 

    @ApiProperty()
    @Expose()
    status: boolean;

    @ApiProperty()
    @Expose()
    discount?: number; //or list?

    @ApiProperty()
    @Expose()
    takeaway: boolean;

    constructor(partial: Partial<OrderDto>) {
        Object.assign(this, partial);
    }
}
