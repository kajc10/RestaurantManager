import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { ClientSession, Model } from 'mongoose';
import { UserDto } from './dto/user.dto';

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


    async create(UserDto: UserDto): Promise <UserDocument> {
        const user = new this.userModel(UserDto);
        return user.save();
      }
    
    async update(id: string, UserDto: UserDto): Promise <UserDocument> {
        return this.userModel.findByIdAndUpdate(id, UserDto);
    }
    
    async remove(id: string) {
        return this.userModel.findByIdAndRemove(id);
    }
}
