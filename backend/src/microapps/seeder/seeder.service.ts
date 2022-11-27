import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user/schema/user.schema';
import bcrypt from "bcrypt";

@Injectable()
export class SeederService {
    constructor(
        @InjectConnection() private connection: Connection,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async seed() {
        await this.connection.db.dropDatabase();
        // This timeout is really important, otherwise with mongoDB < 5 might recieve transaction failed due to pending catalog changes
        await new Promise((resolve) => setTimeout(resolve, 250));

        const user = {
            username: 'test',
            isAdmin: true,
            status: 'active',
            password: '',
        }
        user.password = await bcrypt.hash('Test1234', 4);
        const userDocument = new this.userModel(user);
        await userDocument.save();
    }
}
