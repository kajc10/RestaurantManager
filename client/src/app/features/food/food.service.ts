import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FoodDto, FoodService as FoodApi } from 'src/app/sdk';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private foodApi: FoodApi,
  ) { }

  getFoods(): Observable<FoodDto[]> {
    //return this.foodApi.foodControllerFindAll();
    return of([{id: '112', name: 'asd', price: 123}]);
  }
}
