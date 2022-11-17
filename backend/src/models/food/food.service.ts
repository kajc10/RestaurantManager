import { Injectable } from '@nestjs/common';
import { FoodDto } from './dto/food.dto';

@Injectable()
export class FoodService {
  create(FoodDto: FoodDto) {
    return 'This action adds a new food';
  }

  findAll() {
    return `This action returns all food`;
  }

  findOne(id: number) {
    return `This action returns a #${id} food`;
  }

  update(id: number, FoodDto: FoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
