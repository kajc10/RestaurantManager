import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodListComponent } from './food-list/food-list.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FoodEditorComponent } from './food-editor/food-editor.component';


@NgModule({
  declarations: [
    FoodListComponent,
    FoodEditorComponent
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ]
})
export class FoodModule { }
