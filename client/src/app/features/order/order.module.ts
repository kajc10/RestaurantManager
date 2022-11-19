import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderEditorComponent } from './order-editor/order-editor.component';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  declarations: [
  
    OrderEditorComponent,
       OrderListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
