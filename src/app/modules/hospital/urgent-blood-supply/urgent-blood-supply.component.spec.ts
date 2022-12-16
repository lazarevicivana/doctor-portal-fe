import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentBloodSupplyComponent } from './urgent-blood-supply.component';

describe('UrgentBloodSupplyComponent', () => {
  let component: UrgentBloodSupplyComponent;
  let fixture: ComponentFixture<UrgentBloodSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrgentBloodSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrgentBloodSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
