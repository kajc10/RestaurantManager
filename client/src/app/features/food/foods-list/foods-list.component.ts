import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { FoodDto } from 'src/app/sdk';
import { FoodService } from '../food.service';

@Component({
    selector: 'app-foods-list',
    templateUrl: './foods-list.component.html',
    styleUrls: ['./foods-list.component.scss']
})
export class FoodsListComponent implements OnInit {
    dataSource = new MatTableDataSource<FoodDto>();
    displayedColumns = [
        'name',
        'price',
        'operations',
    ];

    foods: FoodDto[] = [];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private foodService: FoodService,
        private spinner: NgxSpinnerService,
    ) { }

    ngOnInit(): void {
        this.paginator.pageSize = 25;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        this.reload();
    }

    private reload(): void {
        this.spinner.show();
        this.foodService.getFoods().subscribe({
            next: (foods: FoodDto[]) => {
                this.foods = foods;
                this.dataSource.data = this.foods;
            },
            complete: () => {
                this.spinner.hide();
            },
            error: (err) => {
                console.log(err);
                this.spinner.hide();
            },
        });
    }

    addFood() {

    }
    
    public updateFood(id:string, data:FoodDto){
        this.foodService.updateFood(id,data);
    }

    public deleteFood(id?:string){
        alert('got food id:'+id);
        this.foodService.deleteFood(id);
        this.reload();
    }

}
