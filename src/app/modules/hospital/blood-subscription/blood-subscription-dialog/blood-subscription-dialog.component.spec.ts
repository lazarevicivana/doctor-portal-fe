import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSubscriptionDialogComponent } from './blood-subscription-dialog.component';

describe('BloodSubscriptionDialogComponent', () => {
  let component: BloodSubscriptionDialogComponent;
  let fixture: ComponentFixture<BloodSubscriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodSubscriptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodSubscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
