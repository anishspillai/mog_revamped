import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemsDetailsTableComponent } from './cart-items-details-table.component';

describe('CartItemsDetailsTableComponent', () => {
  let component: CartItemsDetailsTableComponent;
  let fixture: ComponentFixture<CartItemsDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemsDetailsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemsDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
