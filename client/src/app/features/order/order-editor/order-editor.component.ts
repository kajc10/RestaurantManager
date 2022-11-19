import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderDto } from 'src/app/sdk';
import { OrderListComponent } from '../order-list/order-list.component';
import { OrderService } from '../order.service';

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
        discount: 0,
        status: false,
        takeaway: false,
    });

    title = '';
    error = '';
    selectedOrder: OrderDto;

    constructor(
        private fb: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        private orderService: OrderService,
        public dialogRef: MatDialogRef<OrderListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: OrderEditorDialogData,
    ) { }

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

    onSubmit(): void {
        this.spinner.show();

        switch (this.data.type) {
            case OrderEditorType.NEW: {
                this.orderService
                    .createOrder({
                        orderItems: this.orderEditorForm.value.orderItems,
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
