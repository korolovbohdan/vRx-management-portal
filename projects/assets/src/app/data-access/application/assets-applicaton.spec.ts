import { TestBed } from '@angular/core/testing';

import { AssetsApplicationService } from './assets-application.service';

describe('AssetsApplicationService', () => {
  let service: AssetsApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
