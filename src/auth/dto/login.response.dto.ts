import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { UserDto } from "src/models/user/dto/user.dto";

@Exclude()
export class LoginResponseDto {
    
    @ApiProperty()
    @Expose()
    access_token: string;

    @ApiProperty()
    @Expose()
    user: UserDto;

    constructor(partial: Partial<LoginResponseDto>) {
        Object.assign(this, partial);
    }
}