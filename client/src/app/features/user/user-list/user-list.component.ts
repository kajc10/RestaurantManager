import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserDto } from 'src/app/sdk';
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
    ]
    users: UserDto[] = [];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private userService: UserService,
        private spinner: NgxSpinnerService,
        // private dialog: MatDialog,
        // private nestAuthService: NestAuthService,
    ) { }

    ngOnInit(): void {
        this.paginator.pageSize = 25;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        this.reload();
    }

    private reload(): void {
        this.spinner.show();
        this.userService.getUsers().subscribe({
            next: (users: UserDto[]) => {
                console.log(users);
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

}
