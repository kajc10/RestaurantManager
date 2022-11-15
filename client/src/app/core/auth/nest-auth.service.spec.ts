import { TestBed } from '@angular/core/testing';

import { NestAuthService } from './nest-auth.service';

describe('NestAuthService', () => {
  let service: NestAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NestAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
