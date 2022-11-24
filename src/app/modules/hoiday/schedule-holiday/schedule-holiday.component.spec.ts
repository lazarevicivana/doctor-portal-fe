import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleHolidayComponent } from './schedule-holiday.component';

describe('ScheduleHolidayComponent', () => {
  let component: ScheduleHolidayComponent;
  let fixture: ComponentFixture<ScheduleHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleHolidayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
