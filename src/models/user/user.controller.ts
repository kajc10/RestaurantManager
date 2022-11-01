import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import {
    ApiBody,
    ApiHeader,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { Filter } from 'src/common/decorators/filter.decorator';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    @ApiOkResponse({ type: [UserDto] })
    @ApiHeader({
        name: 'X-Filter',
        description: 'Filter',
    })
    @UseInterceptors(ClassSerializerInterceptor)
    async find(
        @Filter() filter: string,
    ): Promise<UserDto[]> {
        return (
            await this.userService.find(
                filter ? JSON.parse(filter) : {},
            )
        ).map((userDocument) => new UserDto(userDocument.toObject()));
    }

    @Get(':userId')
    @ApiOkResponse({ type: UserDto })
    @ApiParam({
        name: 'userId',
        type: String,
        required: true,
    })
    @UseInterceptors(ClassSerializerInterceptor)
    async findById(@Param() params): Promise<UserDto> {
        const user = await this.userService.findById(params.userId);
        return new UserDto(user.toObject());
    }

    //TODO: ADD missing crud endpoints


}
