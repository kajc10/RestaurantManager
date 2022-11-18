import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserDto } from 'src/app/sdk';
import { UserListComponent } from '../user-list/user-list.component';
import { UserService } from '../user.service';

export interface UserEditorDialogData {
    user?: UserDto;
    type: UserEditorType;
}

export enum UserEditorType {
    NEW,
    EDIT,
}

@Component({
    selector: 'app-user-editor',
    templateUrl: './user-editor.component.html',
    styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
    userEditorForm = this.fb.group({
        username: [''],
        admin: false,
    });

    title = '';
    error = '';
    selectedUser: UserDto;

    constructor(
        private fb: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        private userService: UserService,
        public dialogRef: MatDialogRef<UserListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UserEditorDialogData,
    ) { }

    ngOnInit(): void {
        switch (this.data.type) {
            case UserEditorType.NEW: {
                this.title = 'Felhasználó létrehozása';
                break;
            }
            case UserEditorType.EDIT: {
                this.title = 'Felhasználó szerkesztése';
                break;
            }
        }
        if (this.data.user != null) {
            this.selectedUser = this.data.user;
            this.userEditorForm.setValue(
                {
                    username: this.data.user.username || '',
                    admin: this.data.user.isAdmin || false,
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
            case UserEditorType.NEW: {
                this.userService
                    .createUser({
                        username: this.userEditorForm.value.username,
                        isAdmin: this.userEditorForm.value.admin,
                    })
                    .subscribe({
                        next: (user) => this.dialogRef.close(user),
                        error: (error) => this.error = error,
                    });
                break;
            }
            case UserEditorType.EDIT: {
                this.selectedUser.username = this.userEditorForm.value.username;
                this.selectedUser.isAdmin = this.userEditorForm.value.admin,
                this.userService.editUser(this.selectedUser)
                    .subscribe({
                        next: (user) => this.dialogRef.close(user),
                        error: (error) => this.error = error,
                    });
                break;
            }
        }
    }

}
