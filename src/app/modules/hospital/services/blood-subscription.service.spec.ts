import { TestBed } from '@angular/core/testing';

import { BloodSubscriptionService } from './blood-subscription.service';

describe('BloodSubscriptionService', () => {
  let service: BloodSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
