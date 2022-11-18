import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from './dto/order.dto';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(OrderDto: OrderDto): Promise<OrderDocument> {
    const order = new this.orderModel(OrderDto);
    return await order.save();
  }

  async findAll(): Promise <OrderDocument[]> {
    return await this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<OrderDocument> {
    return await this.orderModel.findById(id).exec();
  }

  async update(id: string, OrderDto: OrderDto): Promise<OrderDocument> {
    return await this.orderModel.findByIdAndUpdate(id, OrderDto).exec();
  }

  async remove(id: string): Promise<OrderDocument> {
    return await this.orderModel.findByIdAndRemove(id).exec();
  }
}
