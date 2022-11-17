import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodDto } from './dto/food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() FoodDto: FoodDto) {
    return this.foodService.create(FoodDto);
  }

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() FoodDto: FoodDto) {
    return this.foodService.update(+id, FoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
