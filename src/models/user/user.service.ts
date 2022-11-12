import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { ClientSession, Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async find(filter): Promise<UserDocument[]> {
        return this.userModel.find(filter.where).exec();
    }

    async findById(userId: string): Promise<UserDocument> {
        return this.userModel.findById(userId).exec();
    }

    async findByUsername(username: string): Promise<UserDocument> {
        return this.userModel.findOne({ username: username }).exec();
    }
}
