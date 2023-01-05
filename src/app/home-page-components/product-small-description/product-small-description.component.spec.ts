import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSmallDescriptionComponent } from './product-small-description.component';

describe('ProductSmallDescriptionComponent', () => {
  let component: ProductSmallDescriptionComponent;
  let fixture: ComponentFixture<ProductSmallDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSmallDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSmallDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
