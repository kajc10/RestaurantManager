import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { layoutChildRoutes } from 'src/app/core/router/route-child-wrapper';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  layoutChildRoutes([
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    {path: 'users', component: UserListComponent, canActivate: [AuthGuard],}
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
