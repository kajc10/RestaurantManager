import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReservationDto } from 'src/app/sdk';
import { ReservationEditorComponent, ReservationEditorType } from '../reservation-editor/reservation-editor.component';
import { ReservationService } from '../reservation.service';

@Component({
    selector: 'app-reservation-list',
    templateUrl: './reservation-list.component.html',
    styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
    dataSource = new MatTableDataSource<ReservationDto>();
    displayedColumns = [
        'date',
        'numberOfPeople',
        'name',
        'contact',
        'notes',
        'operations'
    ];

    reservations: ReservationDto[] = [];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private reservationService: ReservationService,
        private spinner: NgxSpinnerService,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.paginator.pageSize = 25;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        this.reload();
    }

    private reload(): void {
        this.spinner.show();
        this.reservationService.getReservations().subscribe({
            next: (reservations: ReservationDto[]) => {
                this.reservations = reservations;
                this.dataSource.data = this.reservations;
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

    addReservation(): void {
        this.dialog
        .open(ReservationEditorComponent, {
            width: '600px',
            panelClass: 'no-padding-dialog-container',
            disableClose: true,
            autoFocus: false,
            data: { reservation: null, type: ReservationEditorType.NEW },
        })
        .afterClosed()
        .subscribe((shouldReload) => {
            if (shouldReload) {
                this.reload();
            }
        });
    }

    editReservation(reservation: ReservationDto): void {
        this.dialog
        .open(ReservationEditorComponent, {
            width: '600px',
            panelClass: 'no-padding-dialog-container',
            disableClose: true,
            autoFocus: false,
            data: { reservation: reservation, type: ReservationEditorType.EDIT },
        })
        .afterClosed()
        .subscribe((shouldReload) => {
            if (shouldReload) {
                this.reload();
            }
        });
    }

    deleteReservation(reservation: ReservationDto): void {
        this.reservationService.deleteReservation(reservation.id)
            .subscribe({
                next: () => this.reload(),
            });
    }

    getReservationDate(date: string): string {
        return moment(date).format('YYYY.MM.DD - HH:mm');
    }

}
