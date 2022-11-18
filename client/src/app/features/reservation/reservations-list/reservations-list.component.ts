import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReservationDto } from 'src/app/sdk';
import { ReservationService } from '../reservation.service';

@Component({
    selector: 'app-reservations-list',
    templateUrl: './reservations-list.component.html',
    styleUrls: ['./reservations-list.component.scss']
})
export class ReservationsListComponent implements OnInit {
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

    addReservation() {

    }

}
