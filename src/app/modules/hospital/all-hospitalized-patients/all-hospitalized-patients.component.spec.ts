import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllHospitalizedPatientsComponent } from './all-hospitalized-patients.component';

describe('AllHospitalizedPatientsComponent', () => {
  let component: AllHospitalizedPatientsComponent;
  let fixture: ComponentFixture<AllHospitalizedPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHospitalizedPatientsComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AllHospitalizedPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
