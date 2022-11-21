import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { NestAuthService } from 'src/app/core/auth/nest-auth.service';
import { OrderDto } from 'src/app/sdk';
import { OrderEditorComponent, OrderEditorType } from '../order-editor/order-editor.component';
import { OrderService } from '../order.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})

export class OrderListComponent implements OnInit {
    dataSource = new MatTableDataSource<OrderDto>();
    displayedColumns = [

    ];

    orders: OrderDto[] = [];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private orderService: OrderService,
        private spinner: NgxSpinnerService,
        private dialog: MatDialog,
        private nestAuthService: NestAuthService,
    ) { }

    ngOnInit(): void {
        this.reload();
    }

    private reload(): void {
        this.spinner.show();
        this.orderService.getOrders().subscribe({
            next: (orders: OrderDto[]) => {
                this.orders = orders;
                this.dataSource.data = this.orders;
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

    
    addOrder(): void {
        this.dialog
        .open(OrderEditorComponent, {
            width: '600px',
            panelClass: 'no-padding-dialog-container',
            disableClose: true,
            autoFocus: false,
            data: { user: null, type: OrderEditorType.NEW },
        })
        .afterClosed()
        .subscribe((shouldReload) => {
            if (shouldReload) {
                this.reload();
            }
        });
    }

    editOrder(order: OrderDto): void {
        this.dialog
        .open(OrderEditorComponent, {
            width: '600px',
            panelClass: 'no-padding-dialog-container',
            disableClose: true,
            autoFocus: false,
            data: { order: order, type: OrderEditorType.EDIT },
        })
        .afterClosed()
        .subscribe((shouldReload) => {
            if (shouldReload) {
                this.reload();
            }
        });
    }

    deleteOrder(order: OrderDto): void {
        this.orderService.deleteOrder(order.id)
            .subscribe({
                next: () => this.reload(),
            });
    }

    downloadInvoice(order: OrderDto): void {
        this.spinner.show();
        this.orderService
            .downloadInvoice(order.id)
            .pipe(finalize(() => this.spinner.hide()))
            .subscribe((blob) => {
                if (
                    window.navigator &&
                    (window.navigator as any).msSaveOrOpenBlob
                ) {
                    (window.navigator as any).msSaveOrOpenBlob(blob);
                    return;
                }
                const data = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = data;
                link.download = `invoice-${new Date().getTime()}.pdf`;
                link.click();
                setTimeout(function () {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(data);
                }, 100);
            })
    }


}
