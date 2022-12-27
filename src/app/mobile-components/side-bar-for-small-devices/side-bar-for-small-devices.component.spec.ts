import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarForSmallDevicesComponent } from './side-bar-for-small-devices.component';

describe('SideBarForSmallDevicesComponent', () => {
  let component: SideBarForSmallDevicesComponent;
  let fixture: ComponentFixture<SideBarForSmallDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarForSmallDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarForSmallDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
