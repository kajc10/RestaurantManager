import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOkResponse({ type: [OrderDto] })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<OrderDto[]> {
    return (await this.orderService.findAll()).map((orderDocument) => new OrderDto(orderDocument.toObject()));
  }
  
  @Post()
  @ApiOkResponse({ type: OrderDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() orderDto: OrderDto): Promise<OrderDto> {
    const order = await this.orderService.create(orderDto);
    return new OrderDto(order.toObject());
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: string): Promise<OrderDto> {
    const order = await this.orderService.findOne(id);
    return new OrderDto(order.toObject());
  }


  @Patch(':id')
  @ApiOkResponse({ type: OrderDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() orderDto: OrderDto): Promise<OrderDto> {
    const updatedOrder = await this.orderService.update(id, orderDto);
    return new OrderDto(updatedOrder.toObject());
  }

  @Delete(':id')
  @ApiOkResponse({ type: OrderDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async remove(@Param('id') id: string): Promise<OrderDto> {
    const deletedOrder = await this.orderService.remove(id);
    return new OrderDto(deletedOrder.toObject());
  }
}
