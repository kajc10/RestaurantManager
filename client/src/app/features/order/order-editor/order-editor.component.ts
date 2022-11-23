import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, startWith } from 'rxjs';
import { FoodDto, OrderDto } from 'src/app/sdk';
import { OrderListComponent } from '../order-list/order-list.component';
import { OrderService } from '../order.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';


export interface OrderEditorDialogData {
    order?: OrderDto;
    type: OrderEditorType;
}

export enum OrderEditorType {
    NEW,
    EDIT,
}

@Component({
    selector: 'app-order-editor',
    templateUrl: './order-editor.component.html',
    styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit {
    orderEditorForm = this.fb.group({
        orderItems: [''],
        notes: [''],
        discount: 0,
        status: false,
        takeaway: false,
    });

    title = '';
    error = '';
    selectedOrder: OrderDto;

    //for chip
    separatorKeysCodes: number[] = [ENTER, COMMA];
    formControlOrderItems = new FormControl('');
    allFoods : FoodDto[];
    allFoodNames: string[] = []; //to check matches real-time when typing new
    matchingFoods: Observable<string[]>;  

    @ViewChild('foodInput') foodInput: ElementRef<HTMLInputElement>;

    constructor(
        private fb: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        private orderService: OrderService,
        public dialogRef: MatDialogRef<OrderListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: OrderEditorDialogData,
    ) { 

        this.orderService.getFoods().subscribe({
            next: (foods: FoodDto[]) => {
                this.allFoods = foods;
                this.allFoodNames = this.allFoods.map(x=>x.name);
                console.log(this.allFoodNames);
            },
            complete: () => {
                this.spinner.hide();
            },
            error: (err) => {
                console.log(err);
                this.spinner.hide();
            },
        });

        this.matchingFoods = this.formControlOrderItems.valueChanges.pipe(
            startWith(null),
            map((food: string | null) => (food ? this._filter(food) : this.allFoodNames.slice())),
          );
    }

    ngOnInit(): void {

        switch (this.data.type) {
            case OrderEditorType.NEW: {
                this.title = 'Rendelés létrehozása';
                break;
            }
            case OrderEditorType.EDIT: {
                this.title = 'Rendelés szerkesztése';
                break;
            }
        }
        if (this.data.order != null) {
            this.selectedOrder = this.data.order;
            this.orderEditorForm.setValue(
                {
                    orderItems: this.data.order.orderItems || [''],
                    notes: this.data.order.notes || [''],
                    status: this.data.order.status || false,
                    discount: this.data.order.discount || 0,
                    takeaway: this.data.order.takeaway || false,

                },
                { emitEvent: false },
            );
        }
    }

    ngOnDestroy(): void {
        this.spinner.hide();
    }

    cancel(): void {
        this.dialogRef.close();
    }

    getFoodByName(name:string){
        return this.orderService.getFoodByName(name);
    }

    addOrderItem(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        var food = this.getFoodByName(value);
        if (value) {
            this.data.order.orderItems.push(food);
            //this.orderEditorForm.value.orderItems.push(food);
        }
        event.chipInput!.clear();
        this.formControlOrderItems.setValue(null);
    }

    removeOrderItem(foodItem: FoodDto): void {
        const food = this.orderEditorForm.value.orderItems.find(element => element.id == foodItem.id);
        const index = this.orderEditorForm.value.orderItems.indexOf(food);
        if (index >= 0) {
            this.orderEditorForm.value.orderItems.splice(index, 1);
        }
      }
    
      selected(event: MatAutocompleteSelectedEvent): void {
        var food = this.getFoodByName(event.option.viewValue);
        
        //this.orderEditorForm.value.orderItems.push(food); //selected_items
        this.data.order.orderItems.push(food);
        this.foodInput.nativeElement.value = '';
        this.formControlOrderItems.setValue(null);
      }


      private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allFoodNames.filter(food => food.toLowerCase().includes(filterValue));
      }


    onSubmit(): void {
        this.spinner.show();

        switch (this.data.type) {
            case OrderEditorType.NEW: {
                this.orderService
                    .createOrder({
                        orderItems: this.orderEditorForm.value.orderItems,
                        notes: this.orderEditorForm.value.notes,
                        status:  this.orderEditorForm.value.status,
                        discount:  this.orderEditorForm.value.discount,
                        takeaway:  this.orderEditorForm.value.takeaway,
                    })
                    .subscribe({
                        next: (order) => this.dialogRef.close(order),
                        error: (error) => this.error = error,
                    });
                break;
            }
            case OrderEditorType.EDIT: {
                this.selectedOrder.orderItems = this.orderEditorForm.value.orderItems,
                this.selectedOrder.notes = this.orderEditorForm.value.notes,
                this.selectedOrder.status =  this.orderEditorForm.value.status,
                this.selectedOrder.discount =  this.orderEditorForm.value.discount,
                this.selectedOrder.takeaway =  this.orderEditorForm.value.takeaway,

                this.orderService.editOrder(this.selectedOrder)
                    .subscribe({
                        next: (order) => this.dialogRef.close(order),
                        error: (error) => this.error = error,
                    });
                break;
            }
        }
    }

}
