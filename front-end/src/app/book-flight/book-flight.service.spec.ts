import { TestBed } from '@angular/core/testing';

import { BookFlightService } from './book-flight.service';

describe('BookFlightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookFlightService = TestBed.get(BookFlightService);
    expect(service).toBeTruthy();
  });
});
