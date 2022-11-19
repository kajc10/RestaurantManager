import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { layoutChildRoutes } from 'src/app/core/router/route-child-wrapper';
import { FoodListComponent } from './food-list/food-list.component';

const routes: Routes = [
    layoutChildRoutes([
        { path: 'foods', component:FoodListComponent, canActivate: [AuthGuard]}
    ]),
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FoodRoutingModule { }
