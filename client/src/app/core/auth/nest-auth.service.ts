import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserDto } from 'src/app/sdk';

@Injectable({
  providedIn: 'root'
})
export class NestAuthService {
  private user: UserDto | null = null;
  private token: string;

  constructor(private cookieService: CookieService) { 
    const user = this.cookieService.get('user');
    if (user) {
      this.user = JSON.parse(user);
    }
    this.token = this.cookieService.get('token');
  }

  setAccessToken(token: string) {
    this.token = token;
    this.cookieService.set('token', this.token, { path: '/' });
  }

  setUser(user: UserDto) {
    this.user = user;
    this.cookieService.set('user', JSON.stringify(user), { path: '/' });
  }
  
  clear() {
    this.user = null;
    this.token = '';
    this.cookieService.delete('token', '/');
    this.cookieService.delete('user', '/');
  } 

  getAccessToken(): string {
    return this.token ? this.token : '';
  }

  getUser(): UserDto | null {
    return this.user; 
  }   
}
