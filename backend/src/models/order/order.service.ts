import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  create(OrderDto: OrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, OrderDto: OrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
