import { TestBed } from '@angular/core/testing';

import { ViewDetailsService } from './view-details.service';

describe('ViewDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewDetailsService = TestBed.get(ViewDetailsService);
    expect(service).toBeTruthy();
  });
});
