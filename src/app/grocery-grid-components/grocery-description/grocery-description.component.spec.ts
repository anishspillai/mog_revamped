import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryDescriptionComponent } from './grocery-description.component';

describe('GroceryDescriptionComponent', () => {
  let component: GroceryDescriptionComponent;
  let fixture: ComponentFixture<GroceryDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
