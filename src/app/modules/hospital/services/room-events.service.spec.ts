import { TestBed } from '@angular/core/testing';

import { RoomEventsService } from './room-events.service';

describe('RoomEventsService', () => {
  let service: RoomEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
