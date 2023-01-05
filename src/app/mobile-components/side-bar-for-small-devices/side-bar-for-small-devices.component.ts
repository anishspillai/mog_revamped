import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroceryTypesTopMenuBarComponent } from 'src/app/grocery-grid-components/grocery-types-top-menu-bar/grocery-types-top-menu-bar.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebasedbService } from 'src/app/shared/services/firebasedb.service';

@Component({
  selector: 'app-side-bar-for-small-devices',
  templateUrl: './side-bar-for-small-devices.component.html',
  styleUrls: ['./side-bar-for-small-devices.component.scss']
})
export class SideBarForSmallDevicesComponent extends GroceryTypesTopMenuBarComponent {

  constructor(override readonly firebaseDbObj: FirebasedbService,
    override readonly router: Router,
    readonly authService: AuthService) {
    super(firebaseDbObj, router);
  }

  get firebaseAuthObject() {
    return this.authService.afAuth
  }

  logOut() {
    this.authService.logout()
  }
}
