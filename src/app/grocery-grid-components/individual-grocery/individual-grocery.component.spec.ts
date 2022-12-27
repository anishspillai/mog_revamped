import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualGroceryComponent } from './individual-grocery.component';

describe('IndividualGroceryComponent', () => {
  let component: IndividualGroceryComponent;
  let fixture: ComponentFixture<IndividualGroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualGroceryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
