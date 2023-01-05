import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContactParentComponent } from './user-contact-parent.component';

describe('UserContactParentComponent', () => {
  let component: UserContactParentComponent;
  let fixture: ComponentFixture<UserContactParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserContactParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserContactParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
