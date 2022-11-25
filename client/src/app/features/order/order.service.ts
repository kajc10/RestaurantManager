import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderDto, OrderService as OrderApi } from 'src/app/sdk';
import { FoodDto, FoodService as FoodApi } from 'src/app/sdk';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private orderApi: OrderApi,
    private foodApi: FoodApi,
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

  getFoods(): Observable<FoodDto[]> {
    return this.foodApi.foodControllerFindAll();
  }

  downloadInvoice(orderId: string): Observable<any> {
    return this.orderApi
      .orderControllerDownloadInvocie(
        orderId,
        'body',
        false,
        {
          httpHeaderAccept: 'blob' as any,
        },
      )
      .pipe(
        map((res) => {
          return new Blob([res], { type: 'application/pdf' });
        }),
      );
  }
}