import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, throwError } from 'rxjs';
import { NestAuthService } from './auth/nest-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationErrorInterceptorService implements HttpInterceptor {

  constructor(
    private nestAuthService: NestAuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status == 401) {
          if (this.nestAuthService.getAccessToken != null) {
            this.nestAuthService.clear();
          }
          this.router.navigate(['/login']);
          this.spinner.hide();
        } else {
          console.log(err);
        }
        return throwError(() => err);
      }),
    );
  }
}
