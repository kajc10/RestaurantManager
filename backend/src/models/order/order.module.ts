import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { PdfGeneratorModule } from 'src/pdf-generator/pdf.generator.module';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    PdfGeneratorModule,
  ],
  exports: [OrderService],
})
export class OrderModule {}
