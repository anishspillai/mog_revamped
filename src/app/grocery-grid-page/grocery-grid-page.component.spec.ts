import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryGridPageComponent } from './grocery-grid-page.component';

describe('GroceryGridPageComponent', () => {
  let component: GroceryGridPageComponent;
  let fixture: ComponentFixture<GroceryGridPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryGridPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
