import { Component, OnInit } from '@angular/core';
import { FirebasedbService } from 'src/app/shared/services/firebasedb.service';
import { Menuitem } from 'src/app/shared/services/menuitem';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-grocery-types-top-menu-bar',
  templateUrl: './grocery-types-top-menu-bar.component.html',
  styleUrls: ['./grocery-types-top-menu-bar.component.scss']
})
export class GroceryTypesTopMenuBarComponent implements OnInit {

  menuItemsWithOutSubItems: Menuitem[] = []
  menuItemsWithtSubItems: Menuitem[] = []

  menuItemWithOutSubItemsMap: Map<number, Menuitem[]> = new Map()

  constructor(readonly firebaseDbObj: FirebasedbService, 
    readonly router: Router) {
  }

  ngOnInit(): void {
    this.firebaseDbObj.getProductCategoriesForMenuDisplay().subscribe(allMenuItems => {
      this.menuItemsWithOutSubItems = []
      this.menuItemsWithtSubItems = []
      allMenuItems.forEach(menuItem => {
        const childData = menuItem.payload;
        if (!Array.isArray(childData.val())) {
          const menuItem: Menuitem = new Menuitem(childData.val() as string)
          menuItem.url = 'a/y?groceryType=' + childData.val()
          this.menuItemsWithOutSubItems.push(menuItem)
        } else {
          const menuItem: Menuitem = new Menuitem(childData.key as string)
          const subMenuItemsNames: string[] = childData.val() as string[]
          var url: string = '?groceryType=' + childData.key + '&subMenu=true&'
          const subMenuItems: Menuitem[] = []
          subMenuItemsNames.forEach(subMenu => {
            const subMenuItem = new Menuitem(subMenu);
            subMenuItem.url = url + 'subType=' + subMenu
            subMenuItems.push(subMenuItem)
          })
          menuItem.childItems = subMenuItems
          menuItem.childItemsForDesktop = this.convertToMap(subMenuItems)
          this.menuItemsWithtSubItems.push(menuItem)
        }
      })
    })
  }


  convertToMap(subMenuItems: Menuitem[]) {
    const menuItemMap: Map<number, Menuitem[]> = new Map()
    if (subMenuItems) {
      for (let i = 0; i < subMenuItems.length; i += 4) {
        const chunk = subMenuItems.slice(i, i + 4);
        menuItemMap.set(i, chunk)
      }
    }
    return menuItemMap
  }

  navigateToThePage(mainItem: any, subMenuItem: any, isSubMenu: boolean) {
    if (isSubMenu) {
      this.router.navigate(['a/y'], { queryParams: { subMenu: true, groceryType: subMenuItem, mainType: mainItem } })
    } else {
      this.router.navigate(['a/y'], { queryParams: { groceryType: mainItem } })
    }
  }
}
