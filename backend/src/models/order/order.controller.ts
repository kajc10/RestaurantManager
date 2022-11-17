import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiBearerAuth()
  findAll() {
    console.log('adasdas');
    return this.orderService.findAll();
  }
  
  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Post()
  @ApiBearerAuth()
  create(@Body() OrderDto: OrderDto) {
    return this.orderService.create(OrderDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() OrderDto: OrderDto) {
    return this.orderService.update(+id, OrderDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
