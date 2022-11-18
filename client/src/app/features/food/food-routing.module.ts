import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { layoutChildRoutes } from 'src/app/core/router/route-child-wrapper';
import { FoodsListComponent } from './foods-list/foods-list.component';

const routes: Routes = [
    layoutChildRoutes([
        { path: '', redirectTo: 'foods', pathMatch: 'full' },
        { path: 'foods', component:FoodsListComponent, canActivate: [AuthGuard] }
    ]),
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FoodRoutingModule { }
