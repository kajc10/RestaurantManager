import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReservationDto, ReservationService as ReservationApi } from 'src/app/sdk';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private reservationApi: ReservationApi,
  ) { }

  getReservations(): Observable<ReservationDto[]> {
   // return this.reservationApi.reservationControllerFindAll();
    return of([]);
  }
}
