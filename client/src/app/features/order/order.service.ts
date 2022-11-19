import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderDto, OrderService as OrderApi } from 'src/app/sdk';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private orderApi: OrderApi,
  ) { }

  getOrders(): Observable<OrderDto[]> {
    return this.orderApi.orderControllerFindAll();
  }

  getOrderById(orderId: string): Observable<OrderDto> {
    return this.orderApi.orderControllerFindOne(orderId);
  }

  createOrder(order): Observable<OrderDto> {
    return this.orderApi.orderControllerCreate(order);
  }

  editOrder(order: OrderDto): Observable<OrderDto> {
    return this.orderApi.orderControllerUpdate(order.id, order);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.orderApi.orderControllerRemove(orderId);
  }
}