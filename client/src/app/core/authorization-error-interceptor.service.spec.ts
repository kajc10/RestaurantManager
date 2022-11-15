import { TestBed } from '@angular/core/testing';

import { AuthorizationErrorInterceptorService } from './authorization-error-interceptor.service';

describe('AuthorizationErrorInterceptorService', () => {
  let service: AuthorizationErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
