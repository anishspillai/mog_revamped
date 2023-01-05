import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuantityChangerButtonsComponent } from './product-quantity-changer-buttons.component';

describe('ProductQuantityChangerButtonsComponent', () => {
  let component: ProductQuantityChangerButtonsComponent;
  let fixture: ComponentFixture<ProductQuantityChangerButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductQuantityChangerButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductQuantityChangerButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
