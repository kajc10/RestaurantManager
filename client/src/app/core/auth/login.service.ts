import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService, UserDto } from 'src/app/sdk';
import { RegisterDto } from 'src/app/sdk/model/registerDto';
import { NestAuthService } from './nest-auth.service';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(
		private nestAuthService: NestAuthService,
		private authService: AuthService,
		private router: Router,
	) { }

	login(username: string, password: string): Observable<any> {
		return this.authService
			.authControllerLogin({
				username: username,
				password: password,
			})
			.pipe(
				map((result) => {
					if (result.user && result.access_token) {
						this.nestAuthService.setAccessToken(result.access_token);
						this.nestAuthService.setUser(result.user);
					} else {
						this.nestAuthService.clear();
						throw Error('Access denied');
					}
					return result.user;
				}),
			);
	}

	logout() {
		this.nestAuthService.clear();
		this.router.navigate(['/login']);
	}

	register(registerDto: RegisterDto): Observable<UserDto> {
		return this.authService.authControllerRegister(registerDto);
	}
}
