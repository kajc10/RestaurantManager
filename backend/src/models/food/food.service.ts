import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodDto } from './dto/food.dto';
import { Food, FoodDocument } from './schema/food.schema';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<FoodDocument>,
  ) {}

  async create(FoodDto: FoodDto): Promise <FoodDocument> {
    const food = new this.foodModel(FoodDto);
    return food.save();
  }

  async findAll(): Promise <FoodDocument[]> {
    return this.foodModel.find()
      .exec();
  }

  async findOne(id: string) {
    return this.foodModel.findById(id);
  }

  async update(id: string, FoodDto: FoodDto): Promise <FoodDocument> {
    return this.foodModel.findByIdAndUpdate(id, FoodDto);
  }

  async remove(id: string) {
    return this.foodModel.findByIdAndRemove(id);
  }
}
