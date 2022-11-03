import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankChangePasswordComponent } from './blood-bank-change-password.component';

describe('BloodBankChangePasswordComponent', () => {
  let component: BloodBankChangePasswordComponent;
  let fixture: ComponentFixture<BloodBankChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodBankChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodBankChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
