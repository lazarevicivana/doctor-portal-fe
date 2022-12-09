import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardAppointmentComponent } from './forward-appointment.component';

describe('ForwardAppointmentComponent', () => {
  let component: ForwardAppointmentComponent;
  let fixture: ComponentFixture<ForwardAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
