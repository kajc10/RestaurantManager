import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import bcrypt from "bcrypt";

@Injectable()
export class UserService {
    saltRounds = 4;
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async find(filter): Promise<UserDocument[]> {
        return await this.userModel.find(filter.where).exec();
    }

    async findById(userId: string): Promise<UserDocument> {
        return await this.userModel.findById(userId).exec();
    }

    async findByUsername(username: string): Promise<UserDocument> {
        return await this.userModel.findOne({ username: username }).exec();
    }


    async create(UserDto: UserDto | RegisterDto): Promise <UserDocument> {
        const storedUser = await this.userModel.findOne({ username: UserDto.username }).exec()
        if (storedUser) {
            throw new BadRequestException('User with username already exists');
        }
        const user = new this.userModel(UserDto);
        return await user.save();
    }

    async register(registerDto: RegisterDto): Promise <UserDocument> {
        const storedUser = await this.userModel.findOne({ username: registerDto.username }).exec()
        if (storedUser) {
            throw new BadRequestException('User with username already exists');
        }
        registerDto.password = await bcrypt.hash(registerDto.password, this.saltRounds);
        const user = new this.userModel(registerDto);
        return await user.save();
    }
    
    async update(id: string, UserDto: UserDto): Promise <UserDocument> {
        return await this.userModel.findByIdAndUpdate(id, UserDto);
    }
    
    async remove(id: string): Promise<UserDocument> {
        return await this.userModel.findByIdAndRemove(id).exec();
    }
}
