import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto, UserService as UserApi } from 'src/app/sdk';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private userApi: UserApi,
    ) { }

    getUsers(): Observable<UserDto[]> {
       return this.userApi.userControllerFind();
    }

    createUser(user): Observable<UserDto> {
        return this.userApi.userControllerCreate(user);
    }

    editUser(user: UserDto): Observable<UserDto> {
        return this.userApi.userControllerUpdate(user.id, user);
    }

    deleteUser(userId: string): Observable<any> {
        return this.userApi.userControllerRemove(userId);
    }
}
