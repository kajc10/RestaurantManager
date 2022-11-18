import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { NestAuthService } from 'src/app/core/auth/nest-auth.service';
import { UserDto } from 'src/app/sdk';
import { UserEditorComponent, UserEditorType } from '../user-editor/user-editor.component';
import { UserService } from '../user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    dataSource = new MatTableDataSource<UserDto>();
    displayedColumns = [
        'username',
        'admin',
        'operations',
    ];
    users: UserDto[] = [];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    adminUser: UserDto;

    constructor(
        private userService: UserService,
        private spinner: NgxSpinnerService,
        private dialog: MatDialog,
        private nestAuthService: NestAuthService,
    ) { }

    ngOnInit(): void {
        this.adminUser = this.nestAuthService.getUser();
        this.paginator.pageSize = 25;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        this.reload();
    }

    private reload(): void {
        this.spinner.show();
        this.userService.getUsers().subscribe({
            next: (users: UserDto[]) => {
                this.users = users,
                this.dataSource.data = this.users;
            },
            complete: () => {
                this.spinner.hide();
            },
            error: (err) => {
                console.log(err);
                this.spinner.hide();
            },
        });
    }

    addUser(): void {
        this.dialog
        .open(UserEditorComponent, {
            width: '600px',
            panelClass: 'no-padding-dialog-container',
            disableClose: true,
            autoFocus: false,
            data: { user: null, type: UserEditorType.NEW },
        })
        .afterClosed()
        .subscribe((shuldReload) => {
            if (shuldReload) {
                this.reload();
            }
        });
    }

    editUser(user: UserDto): void {
        this.dialog
        .open(UserEditorComponent, {
            width: '600px',
            panelClass: 'no-padding-dialog-container',
            disableClose: true,
            autoFocus: false,
            data: { user: user, type: UserEditorType.EDIT },
        })
        .afterClosed()
        .subscribe((shuldReload) => {
            if (shuldReload) {
                this.reload();
            }
        });
    }

    deleteUser(user: UserDto): void {
        this.userService.deleteUser(user.id)
            .subscribe({
                next: () => this.reload(),
            });
    }

}
