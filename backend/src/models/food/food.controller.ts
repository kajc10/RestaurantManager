import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodDto } from './dto/food.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('food')
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() FoodDto: FoodDto) {
    return this.foodService.create(FoodDto);
  }

  @Get()
  @ApiOkResponse({ type: [FoodDto] })
  @ApiBearerAuth()
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() FoodDto: FoodDto) {
    return this.foodService.update(id, FoodDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.foodService.remove(id);
  }
}
