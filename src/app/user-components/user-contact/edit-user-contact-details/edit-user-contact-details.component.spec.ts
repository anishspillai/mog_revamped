import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserContactDetailsComponent } from './edit-user-contact-details.component';

describe('EditUserContactDetailsComponent', () => {
  let component: EditUserContactDetailsComponent;
  let fixture: ComponentFixture<EditUserContactDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserContactDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
