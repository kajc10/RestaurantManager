import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsString } from 'class-validator';

@Exclude()
export class LoginDto {
    @ApiProperty()
    @Expose()
    @IsString()
    username: string;

    @ApiProperty()
    @Expose()
    @IsString()
    password: string;
}