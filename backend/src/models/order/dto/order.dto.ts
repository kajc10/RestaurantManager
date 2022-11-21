import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { Schema } from 'mongoose';
import { TransformObjectIdToString } from '../../../common/decorators/transform-objectid-to-string';
import { FoodDto } from '../../food/dto/food.dto';

@Exclude()
export class OrderDto {
    @Expose({ name: 'id' })
    @TransformObjectIdToString()
    @ApiProperty({ name: 'id', type: String })
    _id: Schema.Types.ObjectId;

    @ApiProperty()
    @Expose()
    @Type(() => FoodDto)
    orderItems: FoodDto[]; 

    @ApiProperty()
    @Expose()
    notes: [''];

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
