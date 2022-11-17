import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { layoutChildRoutes } from 'src/app/core/router/route-child-wrapper';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';

const routes: Routes = [
  layoutChildRoutes([
    {path: 'reservations', component: ReservationsListComponent, canActivate: [AuthGuard]}
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
