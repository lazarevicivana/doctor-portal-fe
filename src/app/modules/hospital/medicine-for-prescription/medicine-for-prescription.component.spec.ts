import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MedicineForPrescriptionComponent} from "./medicine-for-prescription.component";


describe('MedicineForPrescriptionComponent', () => {
  let component: MedicineForPrescriptionComponent;
  let fixture: ComponentFixture<MedicineForPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineForPrescriptionComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MedicineForPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
