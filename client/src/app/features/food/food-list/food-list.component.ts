import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { NestAuthService } from 'src/app/core/auth/nest-auth.service';
import { FoodDto, UserDto } from 'src/app/sdk';
import { FoodEditorComponent, FoodEditorType } from '../food-editor/food-editor.component';
import { FoodService } from '../food.service';

@Component({
    selector: 'app-food-list',
    templateUrl: './food-list.component.html',
    styleUrls: ['./food-list.component.scss']
})

export class FoodListComponent implements OnInit {
    dataSource = new MatTableDataSource<FoodDto>();
    displayedColumns = [
        'name',
        'type',
        'price',
        'operations',
    ];

    foods: FoodDto[] = [];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    adminUser: UserDto;

    constructor(
        private foodService: FoodService,
        private spinner: NgxSpinnerService,
        private dialog: MatDialog,
        private nestAuthService: NestAuthService,
    ) { }

    ngOnInit(): void {
        this.adminUser = this.nestAuthService.getUser();
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

    
    addFood(): void {
        this.dialog
        .open(FoodEditorComponent, {
            width: '600px',
            panelClass: 'no-padding-dialog-container',
            disableClose: true,
            autoFocus: false,
            data: { user: null, type: FoodEditorType.NEW },
        })
        .afterClosed()
        .subscribe((shouldReload) => {
            if (shouldReload) {
                this.reload();
            }
        });
    }

    editFood(food: FoodDto): void {
        this.dialog
        .open(FoodEditorComponent, {
            width: '600px',
            panelClass: 'no-padding-dialog-container',
            disableClose: true,
            autoFocus: false,
            data: { food: food, type: FoodEditorType.EDIT },
        })
        .afterClosed()
        .subscribe((shouldReload) => {
            if (shouldReload) {
                this.reload();
            }
        });
    }

    deleteFood(food: FoodDto): void {
        this.foodService.deleteFood(food.id)
            .subscribe({
                next: () => this.reload(),
            });
    }


}
