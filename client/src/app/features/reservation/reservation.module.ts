import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationEditorComponent } from './reservation-editor/reservation-editor.component';


@NgModule({
  declarations: [
    ReservationListComponent,
    ReservationEditorComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ]
})
export class ReservationModule { }
