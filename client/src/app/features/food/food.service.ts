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
    return this.foodApi.foodControllerFindAll();
  }

  getFoodById(foodId:string): Observable<FoodDto> {
    return this.foodApi.foodControllerFindOne(foodId);
  }

  createFood(food): Observable<FoodDto> {
    return this.foodApi.foodControllerCreate(food);
  }


  editFood(food: FoodDto): Observable<FoodDto> {
    return this.foodApi.foodControllerUpdate(food.id, food);
}

  deleteFood(foodId: string): Observable<any> {
    return this.foodApi.foodControllerRemove(foodId);
}



}
