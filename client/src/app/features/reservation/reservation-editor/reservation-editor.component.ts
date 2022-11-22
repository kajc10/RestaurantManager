import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReservationDto } from 'src/app/sdk';
import { ReservationListComponent } from '../reservation-list/reservation-list.component';
import { ReservationService } from '../reservation.service';

export interface ReservationEditorDialogData {
    reservation?: ReservationDto;
    type: ReservationEditorType;
}

export enum ReservationEditorType {
    NEW,
    EDIT,
}

@Component({
    selector: 'app-reservation-editor',
    templateUrl: './reservation-editor.component.html',
    styleUrls: ['./reservation-editor.component.scss']
})
export class ReservationEditorComponent implements OnInit {
    reservationEditorForm = this.fb.group({
		date : '',
        hour: '',
        minute: '',
        numberOfPeople: 0,
        name: '',
        contact: '',
        notes: ['']
    });

    title = '';
    error = '';
    selectedReservation: ReservationDto;

    constructor(
        private fb: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        private reservationService: ReservationService,
        public dialogRef: MatDialogRef<ReservationListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ReservationEditorDialogData,
    ) { }

    ngOnInit(): void {
        switch (this.data.type) {
            case ReservationEditorType.NEW: {
                this.title = 'Foglalás létrehozása';
                break;
            }
            case ReservationEditorType.EDIT: {
                this.title = 'Foglalás szerkesztése';
                break;
            }
        }
        if (this.data.reservation != null) {
            this.selectedReservation = this.data.reservation;
            this.reservationEditorForm.setValue(
                {
					date : this.data.reservation.date || '',
                    hour: moment(this.data.reservation.date).format('HH'),
                    minute: moment(this.data.reservation.date).format('mm'),
					numberOfPeople: this.data.reservation.numberOfPeople || 0,
					name: this.data.reservation.name || '',
					contact: this.data.reservation.contact || '',
					notes: this.data.reservation.notes || [''],
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
            case ReservationEditorType.NEW: {
                this.reservationService
                    .createReservation({
						date : moment(this.reservationEditorForm.value.date).set({"hour": this.reservationEditorForm.value.hour, "minute": this.reservationEditorForm.value.minute}).toISOString(),
						numberOfPeople: this.reservationEditorForm.value.numberOfPeople,
						name: this.reservationEditorForm.value.name,
						contact: this.reservationEditorForm.value.contact,
						notes: this.reservationEditorForm.value.notes
                    })
                    .subscribe({
                        next: (reservation) => this.dialogRef.close(reservation),
                        error: (error) => this.error = error,
                    });
                break;
            }
            case ReservationEditorType.EDIT: {
                this.selectedReservation.date = moment(this.reservationEditorForm.value.date).set({"hour": this.reservationEditorForm.value.hour, "minute": this.reservationEditorForm.value.minute}).toISOString(),
                this.selectedReservation.numberOfPeople = this.reservationEditorForm.value.numberOfPeople;
                this.selectedReservation.name = this.reservationEditorForm.value.name;
                this.selectedReservation.contact = this.reservationEditorForm.value.contact;
                this.selectedReservation.notes = this.reservationEditorForm.value.notes;
                this.reservationService.editReservation(this.selectedReservation)
                    .subscribe({
                        next: (reservation) => this.dialogRef.close(reservation),
                        error: (error) => this.error = error,
                    });
                break;
            }
        }
    }

}
