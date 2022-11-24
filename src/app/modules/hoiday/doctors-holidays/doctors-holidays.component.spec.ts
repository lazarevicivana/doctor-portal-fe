import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsHolidaysComponent } from './doctors-holidays.component';

describe('DoctorsHolidaysComponent', () => {
  let component: DoctorsHolidaysComponent;
  let fixture: ComponentFixture<DoctorsHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsHolidaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
