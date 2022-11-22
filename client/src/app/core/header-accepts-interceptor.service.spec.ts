import { TestBed } from '@angular/core/testing';

import { HeaderAcceptsInterceptor } from './header-accepts-interceptor.service';

describe('HeaderAcceptsInterceptorService', () => {
  let service: HeaderAcceptsInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderAcceptsInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
