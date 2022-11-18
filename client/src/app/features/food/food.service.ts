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

  getFoodById(id:string): Observable<FoodDto> {
    return this.foodApi.foodControllerFindOne(id);
  }

  updateFood(id:string,data:FoodDto){
   return this.foodApi.foodControllerUpdate(id,data);
  }

  deleteFood(id:string){
    return this.foodApi.foodControllerRemove(id);
   }



}
