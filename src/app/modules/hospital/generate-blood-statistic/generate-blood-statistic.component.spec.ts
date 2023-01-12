import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBloodStatisticComponent } from './generate-blood-statistic.component';

describe('GenerateBloodStatisticComponent', () => {
  let component: GenerateBloodStatisticComponent;
  let fixture: ComponentFixture<GenerateBloodStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateBloodStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateBloodStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
