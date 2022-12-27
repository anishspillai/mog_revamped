import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsSummaryComponent } from './all-products-summary.component';

describe('AllProductsSummaryComponent', () => {
  let component: AllProductsSummaryComponent;
  let fixture: ComponentFixture<AllProductsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProductsSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
