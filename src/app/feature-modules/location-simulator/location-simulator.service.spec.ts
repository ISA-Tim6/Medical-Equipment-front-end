import { TestBed } from '@angular/core/testing';

import { LocationSimulatorService } from './location-simulator.service';

describe('LocationSimulatorService', () => {
  let service: LocationSimulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationSimulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
