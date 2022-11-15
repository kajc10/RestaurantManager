import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { UserListComponent } from './features/user/user-list/user-list.component';

const routes: Routes = [
  // { path: 'users' , canActivate: [AuthGuard], component: UserListComponent},
  //{ path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
