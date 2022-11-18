import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // layoutChildRoutes([
  //   {path: 'orders', component: ReservationsListComponent, canActivate: [AuthGuard]}
  // ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
