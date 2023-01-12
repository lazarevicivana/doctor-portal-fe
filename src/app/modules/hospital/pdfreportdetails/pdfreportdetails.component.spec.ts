import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfreportdetailsComponent } from './pdfreportdetails.component';

describe('PdfreportdetailsComponent', () => {
  let component: PdfreportdetailsComponent;
  let fixture: ComponentFixture<PdfreportdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfreportdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfreportdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
