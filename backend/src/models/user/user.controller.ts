import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import {
    ApiBearerAuth,
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
    @ApiBearerAuth()
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

    @Post()
    @ApiOkResponse({ type: UserDto })
    @ApiBearerAuth()
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() userDto: UserDto): Promise<UserDto> {
      const createdUser = await this.userService.create(userDto);
      return new UserDto(createdUser.toObject());
    }

    @Get(':userId')
    @ApiOkResponse({ type: UserDto })
    @ApiBearerAuth()
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
    
    @Patch(':id')
    @ApiOkResponse({ type: UserDto })
    @ApiBearerAuth()
    @UseInterceptors(ClassSerializerInterceptor)
    async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<UserDto> {
      const updatedUser = await this.userService.update(id, userDto);
      return new UserDto(updatedUser.toObject());
    }
  
    @Delete(':id')
    @ApiBearerAuth()
    async remove(@Param('id') id: string): Promise<UserDto> {
      const deletedUser = await this.userService.remove(id);
      return new UserDto(deletedUser.toObject());
    }


}
