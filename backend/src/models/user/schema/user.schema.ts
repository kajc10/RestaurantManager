import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: false })
    password?: string;

    @Prop({ required: false, default: false })
    isAdmin?: boolean;

    @Prop({ required: true, default: 'registered' })
    status?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
