import { Injectable } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    //TODO: refresh token
    //TODO: nice to have feature for security reasons if logout blacklist token, do this if we have time
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user) {
            const passwordCheck = await bcrypt.compare(pass, user.password);
            if (!passwordCheck) {
                return null;
            }
            const { password, ...result } = user;
            return {
                username: user.username,
                _id: user._id,
                isAdmin: user.isAdmin,
                status: user.status,
            }
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id.toHexString() };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
