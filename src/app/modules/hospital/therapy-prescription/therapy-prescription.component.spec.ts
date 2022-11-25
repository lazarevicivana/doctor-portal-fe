import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyPrescriptionComponent } from './therapy-prescription.component';

describe('TherapyPrescriptionComponent', () => {
  let component: TherapyPrescriptionComponent;
  let fixture: ComponentFixture<TherapyPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapyPrescriptionComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TherapyPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
