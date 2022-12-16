import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSubscriptionComponent } from './blood-subscription.component';

describe('BloodSubscriptionComponent', () => {
  let component: BloodSubscriptionComponent;
  let fixture: ComponentFixture<BloodSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
