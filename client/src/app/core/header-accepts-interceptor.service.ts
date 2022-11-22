import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//https://github.com/swagger-api/swagger-codegen/issues/8399#issuecomment-773958350
@Injectable()
export class HeaderAcceptsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
      // Workaround for this bug in swagger generated code: https://github.com/swagger-api/swagger-codegen/issues/8399
      if (
          request.headers.get('Accept') === 'blob' &&
          request.responseType !== 'blob'
      ) {
          // console.debug(`Changed responseType from '${request.responseType}' to 'text' for url ${request.url}`);
          request = request.clone({ responseType: 'blob' });
      }

      return next.handle(request);
  }
}
