import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartItemsSidebarComponent } from './view-cart-items-sidebar.component';

describe('ViewCartItemsSidebarComponent', () => {
  let component: ViewCartItemsSidebarComponent;
  let fixture: ComponentFixture<ViewCartItemsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCartItemsSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCartItemsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
