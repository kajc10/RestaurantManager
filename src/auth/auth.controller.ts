import { Controller, Request, Post, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { UserDto } from 'src/models/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login.response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Public()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiCreatedResponse({ type: LoginResponseDto })
    @ApiBody({
        type: LoginDto,
        required: true,
        description: 'Login parameters.',
    })
    async login(@Request() req): Promise<LoginResponseDto> {
        const jwtAuthToken = (await this.authService.login(req.user)).access_token;
        return new LoginResponseDto({
            access_token: jwtAuthToken,
            user: new UserDto(req.user),
        });
    }
}
