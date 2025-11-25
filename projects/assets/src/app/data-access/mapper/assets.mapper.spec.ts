import { TestBed } from '@angular/core/testing';

import { AssetsMapper } from './assets.mapper';

describe('AssetsMapper', () => {
  let service: AssetsMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
