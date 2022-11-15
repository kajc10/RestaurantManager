import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './core/auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationErrorInterceptorService } from './core/authorization-error-interceptor.service';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Configuration } from './sdk';
import { NestAuthService } from './core/auth/nest-auth.service';
import { BASE_URL } from './base-urls';
import { LayoutModule } from './core/layout/layout.module';
import { UserModule } from './features/user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    CoreModule,
    HttpClientModule,
    MaterialModule,
    NgxSpinnerModule,
    LayoutModule,
    UserModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationErrorInterceptorService,
      multi: true,
    },
    {
      provide: Configuration,
      useFactory: (nestAuthService: NestAuthService) =>
          new Configuration({
              basePath: BASE_URL,
              accessToken:
                  nestAuthService.getAccessToken.bind(nestAuthService),
          }),
      deps: [NestAuthService],
      multi: false,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
