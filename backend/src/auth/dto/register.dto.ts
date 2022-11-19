import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";

@Exclude()
export class RegisterDto {
    @ApiProperty()
    @Expose()
    @IsString()
    username: string;

    @ApiProperty()
    @Expose()
    @IsString()
    password: string;
    
    constructor(partial: Partial<RegisterDto>) {
        Object.assign(this, partial);
    }
}