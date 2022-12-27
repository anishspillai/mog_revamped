import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBrandsComponent } from './available-brands.component';

describe('AvailableBrandsComponent', () => {
  let component: AvailableBrandsComponent;
  let fixture: ComponentFixture<AvailableBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableBrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
