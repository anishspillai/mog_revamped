import { Component } from '@angular/core';
import { GroceryTypesTopMenuBarComponent } from 'src/app/grocery-grid-components/grocery-types-top-menu-bar/grocery-types-top-menu-bar.component';

@Component({
  selector: 'app-side-bar-for-small-devices',
  templateUrl: './side-bar-for-small-devices.component.html',
  styleUrls: ['./side-bar-for-small-devices.component.scss']
})
export class SideBarForSmallDevicesComponent extends GroceryTypesTopMenuBarComponent{
}
