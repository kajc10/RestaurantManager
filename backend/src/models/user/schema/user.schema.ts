import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class User {
    @Prop({ required: true, immutable: true })
    username: string;

    @Prop({ required: false })
    password?: string;

    @Prop({ required: false })
    isAdmin?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
