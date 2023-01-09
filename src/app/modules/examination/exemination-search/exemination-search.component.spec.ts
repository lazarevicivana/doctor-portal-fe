import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExeminationSearchComponent } from './exemination-search.component';

describe('ExeminationSearchComponent', () => {
  let component: ExeminationSearchComponent;
  let fixture: ComponentFixture<ExeminationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExeminationSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExeminationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
