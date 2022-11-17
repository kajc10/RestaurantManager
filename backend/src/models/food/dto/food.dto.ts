import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Schema } from 'mongoose';
import { TransformObjectIdToString } from '../../../common/decorators/transform-objectid-to-string';

@Exclude()
export class FoodDto {
    @Expose({ name: 'id' })
    @TransformObjectIdToString()
    @ApiProperty({ name: 'id', type: String })
    _id: Schema.Types.ObjectId;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    price: number;

    constructor(partial: Partial<FoodDto>) {
        Object.assign(this, partial);
    }
}
