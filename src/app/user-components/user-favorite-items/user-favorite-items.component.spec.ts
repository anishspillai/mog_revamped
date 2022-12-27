import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavoriteItemsComponent } from './user-favorite-items.component';

describe('UserFavoriteItemsComponent', () => {
  let component: UserFavoriteItemsComponent;
  let fixture: ComponentFixture<UserFavoriteItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFavoriteItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFavoriteItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
