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

  async create(OrderDto: OrderDto): Promise <OrderDocument> {
    const order = new this.orderModel(OrderDto);
    return order.save();
  }

  async findAll(): Promise <OrderDocument[]> {
    return this.orderModel.find()
      .exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id);
  }

  async update(id: string, OrderDto: OrderDto): Promise <OrderDocument> {
    return this.orderModel.findByIdAndUpdate(id, OrderDto);
  }

  async remove(id: string) {
    return this.orderModel.findByIdAndRemove(id);
  }
}
