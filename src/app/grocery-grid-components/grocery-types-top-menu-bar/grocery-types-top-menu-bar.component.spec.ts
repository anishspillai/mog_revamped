import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryTypesTopMenuBarComponent } from './grocery-types-top-menu-bar.component';

describe('GroceryTypesTopMenuBarComponent', () => {
  let component: GroceryTypesTopMenuBarComponent;
  let fixture: ComponentFixture<GroceryTypesTopMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryTypesTopMenuBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryTypesTopMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
