import { TestBed } from '@angular/core/testing';

import { PatientStatisticsService } from './patientStatistics.service';

describe('PatientStatisticsService', () => {
  let service: PatientStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
