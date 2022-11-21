import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { FoodDto, OrderDto, OrderService as OrderApi } from 'src/app/sdk';

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

  add_food_item(food: FoodDto) {
    alert('add food item');
  }
  remove_food_item(food: FoodDto) {
    alert('remove food item');
  }

  downloadInvoice(orderId: string): Observable<any> {
    // return this.orderApi
    //   .orderControllerDownloadInvocie(
    //     orderId,
    //     'body',
    //     false,
    //     {
    //       httpHeaderAccept: 'blob' as any,
    //     },
    //   )
    //   .pipe(
    //     map((res) => {
    //       console.log('asdas')
    //       return new Blob([res], { type: 'application/pdf' });
    //     }),
    //   );
    alert('downloadInvoice');
    return of();
  }
}