import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentReportDialogComponent } from './appointment-report-dialog.component';

describe('AppointmentReportDialogComponent', () => {
  let component: AppointmentReportDialogComponent;
  let fixture: ComponentFixture<AppointmentReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentReportDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
