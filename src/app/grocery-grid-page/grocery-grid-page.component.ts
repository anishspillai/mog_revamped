import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { FirebasedbService } from '../shared/services/firebasedb.service';
import { IndividualGrocery } from '../shared/services/individual-grocery';
@Component({
  selector: 'app-grocery-grid-page',
  templateUrl: './grocery-grid-page.component.html',
  styleUrls: ['./grocery-grid-page.component.scss']
})
//https://www.youtube.com/watch?v=8jDKknEXh3g
//https://therichpost.com/angular-14-bootstrap-5-grocery-ecommerce-store-free-template/
export class GroceryGridPageComponent implements OnInit {

  isSubGroceryType = false
  parentGroceryName = ''
  groceryName = '';
  p = 1


  @ViewChild('anish') test: ElementRef | undefined

  isAwaitingPageLoad = false

  // This one is for groceries
  groceryList: IndividualGrocery[] = []
  intactedGroceryList: IndividualGrocery[] = []


  productCategories: string[] = []
  brandNamesWithCountMap: Map<string, number> = new Map();

  constructor(private db: FirebasedbService,
    private activatedRouter: ActivatedRoute,
    private elementRef: ElementRef,
    private router: Router
  ) {
  }

  
  ngOnInit(): void {
    this.activatedRouter.queryParamMap.subscribe(params => {
      this.isSubGroceryType = params.get("subMenu") === 'true'
      this.parentGroceryName = params.get("mainType") as string
      this.groceryName = params.get("groceryType") as string

      this.fetchGroceries()

      this.fetchMenuForSideNavigation()
    })

  }

  addUserSelectedCheckBoxNameToChildView(filterBrandNameString: string) {
    //var d1 = this.elementRef.nativeElement.querySelector('.anish');
    //d1.insertAdjacentHTML('beforeend', '<span class="mx-2 badge bg-secondary">fsdfdf</span>');
    //this.filterProduct(filterBrandNameString)
  }

  private filterProduct(searchString: string) {
    this.groceryList = this.intactedGroceryList.filter(value => value.brandName.toLowerCase().includes(searchString.toLowerCase()))
  }

  fetchGroceries() {
    //window.alert(this.groceryName)
    this.isAwaitingPageLoad = true
    this.groceryList = []
    this.intactedGroceryList = []

    this.db.getGroceriesList(this.isSubGroceryType, this.groceryName).subscribe(groceries => {
      groceries.forEach(grocerySnapshot => {
        const grocery: IndividualGrocery = grocerySnapshot.payload.val() as IndividualGrocery
        grocery.id = grocerySnapshot.key as string
        this.groceryList.push(grocery)
      })

      this.intactedGroceryList = this.groceryList
      this.extractBrands()
      this.isAwaitingPageLoad = false
    })
  }



  private fetchMenuForSideNavigation() {
    if (this.isSubGroceryType) {
      this.findSubMenu()
    } else {
      this.findMainMenu()
    }
  }

  private findSubMenu() {
    this.productCategories = [];
    this.db.getMenuItemsByParentGroceryName(this.parentGroceryName).subscribe(productCategories => {
      productCategories.forEach(childSnapshot => {
        const childData = childSnapshot.payload;
        console.log(JSON.stringify(childData.val()))
        this.productCategories.push(childData.val() as string)
      })
    })
  }


  private findMainMenu() {
    this.productCategories = [];
    this.db.getMenuItems().subscribe(snapshots => {
      snapshots.forEach(childSnapshot => {
        const childData = childSnapshot.payload;
        if (!Array.isArray(childData.val())) {
          this.productCategories.push(childData.val() as string)
        }
      })
    })
  }

  // I was using ahref for <a> tag for navigating to the specific grocery. But it was reloading the page always.
  // To stop that, I removed the ahref and added the router.navigate methoda
  navigateToTheGroceryItemClickedByUser(subItemLabel: string, itemLabel: string, isMainMenu: boolean) {
    if (isMainMenu) {
      this.router.navigate(['/grocery-list'], {
        queryParams: {
          groceryType: subItemLabel,
          subMenu: true,
          mainType: itemLabel
        }
      })
    } else {
      this.router.navigate(['/grocery-list'], { queryParams: { groceryType: subItemLabel } })
    }
  }


  private extractBrands() {
    this.brandNamesWithCountMap = new Map()
    this.intactedGroceryList.forEach(value => {
        if(!this.brandNamesWithCountMap.has(value.brandName)) {
          this.brandNamesWithCountMap.set(value.brandName, 1);
        } else 
        {
          //@ts-ignore
          this.brandNamesWithCountMap.set(value.brandName, this.brandNamesWithCountMap.get(value.brandName) + 1)
        }
      }
    )
  }
}

