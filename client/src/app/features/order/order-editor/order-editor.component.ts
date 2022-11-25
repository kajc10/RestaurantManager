import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, startWith } from 'rxjs';
import { FoodDto, OrderDto } from 'src/app/sdk';
import { OrderListComponent } from '../order-list/order-list.component';
import { OrderService } from '../order.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { deburr } from 'lodash-es';

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
        orderItems: [[]],
        input: [''],
        notes: [''],
        discount: 0,
        status: false,
        takeaway: false,
    });

    title = '';
    error = '';
    selectedOrder: OrderDto;

    separatorKeysCodes: number[] = [ENTER, COMMA];

    allFoods: FoodDto[];
    newOrderItem: FoodDto;
    filteredFoods: Observable<FoodDto[]>;
    @ViewChild('orderItemInput') orderItemInput: ElementRef<HTMLInputElement>;

    constructor(
        private fb: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        private orderService: OrderService,
        public dialogRef: MatDialogRef<OrderListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: OrderEditorDialogData,
    ) { }

    ngOnInit(): void {
        this.orderService.getFoods().subscribe({
            next: (foods: FoodDto[]) => {
                this.allFoods = foods;
                this.filteredFoods = this.orderEditorForm
                    .get('input')
                    .valueChanges.pipe(
                        startWith(
                            this.orderEditorForm.get('input')
                                .value as string,
                        ),
                        map((value: string) => {
                            const filteredFoods =
                                this.filterFoods(value);
                            return filteredFoods;
                        }),
                    )
            },
            complete: () => {
                this.spinner.hide();
            },
            error: (err) => {
                console.log(err);
                this.spinner.hide();
            },
        });

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
                    input: '',

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

    remove(food: string): void{
        const index = this.orderEditorForm
            .get('orderItems')
            .value.indexOf(food);
        if (index >= 0) {
            this.orderEditorForm.get('orderItems').value.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const food =  this.allFoods.find((food) => food.name === event.option.value);
        this.orderEditorForm
            .get('orderItems')
            .setValue(
                this.orderEditorForm
                    .get('orderItems')
                    .value.concat(food)
            );

        this.orderEditorForm.get('input').setValue('');
        this.orderItemInput.nativeElement.value = '';
        this.orderItemInput.nativeElement.blur();
      }

    filterFoods(value: string): FoodDto[] {
        const filterValue = deburr(value.toLowerCase());

        return this.allFoods.filter((food: FoodDto) => {
            return (
                (deburr(
                    food.name.toLowerCase(),
                ).includes(filterValue)
                )
            );
        });
    }

}