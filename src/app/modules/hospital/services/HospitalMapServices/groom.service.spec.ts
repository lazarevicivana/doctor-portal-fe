import { TestBed } from '@angular/core/testing';

import { GroomService } from './groom.service';

describe('GroomService', () => {
  let service: GroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
