import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStatisticsAgeComponent } from './patient-statistics-age.component';

describe('PatientStatisticsAgeComponent', () => {
  let component: PatientStatisticsAgeComponent;
  let fixture: ComponentFixture<PatientStatisticsAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientStatisticsAgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientStatisticsAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
