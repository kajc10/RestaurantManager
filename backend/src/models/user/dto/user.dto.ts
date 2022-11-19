import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Schema } from 'mongoose';
import { TransformObjectIdToString } from 'src/common/decorators/transform-objectid-to-string';

@Exclude()
export class UserDto {
    //TODO: store more information about users?
    @Expose({ name: 'id' })
    @TransformObjectIdToString()
    @ApiProperty({ name: 'id', type: String })
    _id: Schema.Types.ObjectId;

    @ApiProperty()
    @Expose()
    username: string;

    @ApiProperty()
    @Expose()
    isAdmin: boolean;

    @ApiProperty()
    @Expose()
    status: string;

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}
