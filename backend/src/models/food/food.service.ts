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
    return await food.save();
  }

  async findAll(): Promise <FoodDocument[]> {
    return await this.foodModel.find()
      .exec();
  }

  async findOne(id: string): Promise<FoodDocument> {
    return await this.foodModel.findById(id).exec();
  }

  async update(id: string, FoodDto: FoodDto): Promise<FoodDocument> {
    return await this.foodModel.findByIdAndUpdate(id, FoodDto).exec();
  }

  async remove(id: string): Promise<FoodDocument> {
    return await this.foodModel.findByIdAndRemove(id).exec();
  }
}
