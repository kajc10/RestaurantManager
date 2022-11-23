import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodDto } from './dto/food.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('food')
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @ApiCreatedResponse({ type: FoodDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() foodDto: FoodDto): Promise<FoodDto> {
    const food = await this.foodService.create(foodDto);
    return new FoodDto(food.toObject());
  }

  @Get()
  @ApiOkResponse({ type: [FoodDto] })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<FoodDto[]> {
    return (await this.foodService.findAll()).map((foodDocument) => new FoodDto(foodDocument.toObject()));
  }

  @Get(':id')
  @ApiOkResponse({ type: FoodDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: string): Promise<FoodDto> {
    const food = await this.foodService.findOne(id);
    return new FoodDto(food.toObject());
  }

  @Get(':name')
  @ApiOkResponse({ type: FoodDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async findByName(@Param('name') name: string): Promise<FoodDto> {
    const food = await this.foodService.findByName(name);
    return new FoodDto(food.toObject());
  }

  @Patch(':id')
  @ApiOkResponse({ type: FoodDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() foodDto: FoodDto): Promise<FoodDto> {
    const updatedFood = await this.foodService.update(id, foodDto);
    return new FoodDto(updatedFood.toObject());
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return await this.foodService.remove(id);
  }
}
