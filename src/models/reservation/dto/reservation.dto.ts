import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Schema } from 'mongoose';
import { TransformObjectIdToString } from 'src/common/decorators/transform-objectid-to-string';

@Exclude()
export class ReservationDto {
    @Expose({ name: 'id' })
    @TransformObjectIdToString()
    @ApiProperty({ name: 'id', type: String })
    _id: Schema.Types.ObjectId;

    @ApiProperty()
    @Expose()
    date: Date;

    @ApiProperty()
    @Expose()
    numberOfPeople: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    contact: string;

    @ApiProperty()
    @Expose()
    notes?: string[];

    constructor(partial: Partial<ReservationDto>) {
        Object.assign(this, partial);
    }
}
