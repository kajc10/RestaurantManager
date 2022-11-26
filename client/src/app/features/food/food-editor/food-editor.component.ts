import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { FoodDto } from 'src/app/sdk';
import { FoodListComponent } from '../food-list/food-list.component';
import { FoodService } from '../food.service';

export interface FoodEditorDialogData {
    food?: FoodDto;
    type: FoodEditorType;
}

export enum FoodEditorType {
    NEW,
    EDIT,
}

@Component({
    selector: 'app-food-editor',
    templateUrl: './food-editor.component.html',
    styleUrls: ['./food-editor.component.scss']
})
export class FoodEditorComponent implements OnInit {
    foodEditorForm = this.fb.group({
        name: [''],
        type: '',
        price: 0,
    });

    title = '';
    error = '';
    selectedFood: FoodDto;
    food_types = ['Leves','Főétel','Köret','Desszert','Ital','Szósz','Egyéb']

    constructor(
        private fb: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        private foodService: FoodService,
        public dialogRef: MatDialogRef<FoodListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FoodEditorDialogData,
    ) { }

    ngOnInit(): void {
        switch (this.data.type) {
            case FoodEditorType.NEW: {
                this.title = 'Étel létrehozása';
                break;
            }
            case FoodEditorType.EDIT: {
                this.title = 'Étel szerkesztése';
                break;
            }
        }
        if (this.data.food != null) {
            this.selectedFood = this.data.food;
            this.foodEditorForm.setValue(
                {
                    name: this.data.food.name || '',
                    type: this.data.food.type || '',
                    price: this.data.food.price || 0,
                },
                { emitEvent: false },
            );
        }
    }

    ngOnDestroy(): void {
        this.spinner.hide();
    }

    cancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.spinner.show();

        switch (this.data.type) {
            case FoodEditorType.NEW: {
                this.foodService
                    .createFood({
                        name: this.foodEditorForm.value.name,
                        type: this.foodEditorForm.value.type,
                        price: this.foodEditorForm.value.price,
                    })
                    .subscribe({
                        next: (food) => this.dialogRef.close(food),
                        error: (error) => this.error = error,
                    });
                break;
            }
            case FoodEditorType.EDIT: {
                this.selectedFood.name = this.foodEditorForm.value.name;
                this.selectedFood.type = this.foodEditorForm.value.type;
                this.selectedFood.price = this.foodEditorForm.value.price,
                this.foodService.editFood(this.selectedFood)
                    .subscribe({
                        next: (food) => this.dialogRef.close(food),
                        error: (error) => this.error = error,
                    });
                break;
            }
        }
    }

}
