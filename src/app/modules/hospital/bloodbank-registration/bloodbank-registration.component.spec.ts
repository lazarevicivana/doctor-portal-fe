import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodbankRegistrationComponent } from './bloodbank-registration.component';

describe('BloodbankRegistrationComponent', () => {
  let component: BloodbankRegistrationComponent;
  let fixture: ComponentFixture<BloodbankRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodbankRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodbankRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
