import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ignoreElements, Observable } from 'rxjs';
import { ShoppingCart } from '../shared/model/shopping-cart';
import { ShoppingcartService } from '../shared/observables/shoppingcart.service';
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

  parentGroceryName = ''
  groceryName = '';
  pageNumber = 1 // Starts with one always for pagination ( Page no 1)


  @ViewChild('anish') test: ElementRef | undefined

  isAwaitingPageLoad = false

  // This one is for groceries
  groceryList: IndividualGrocery[] = []
  intactedGroceryList: IndividualGrocery[] = []
  cart$: Observable<ShoppingCart>;


  productCategories: string[] = []
  brandNamesWithCountMap: Map<string, number> = new Map();
  displayAll: boolean;
  subMenu: boolean;

  constructor(private db: FirebasedbService,
    private activatedRouter: ActivatedRoute,
    private elementRef: ElementRef,
    private router: Router,
    private readonly cartService: ShoppingcartService
  ) {
  }


  ngOnInit(): void {
    this.activatedRouter.queryParamMap.subscribe(async params => {
      this.parentGroceryName = params.get("mainType") as string
      this.groceryName = params.get("groceryType") as string
      this.displayAll = params.get("displayAll") === 'true'
      this.subMenu = params.get("subMenu") === 'true'

      this.fetchGroceries()

      this.fetchMenuForSideNavigation()

      this.cart$ = await this.cartService.getCart();
    })

  }

  fetchGroceries() {
    this.isAwaitingPageLoad = true
    this.groceryList = []
    this.intactedGroceryList = []
    this.pageNumber = 1


    this.db.getGroceriesList(this.subMenu, this.groceryName).subscribe(groceries => {
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
    if (this.subMenu || this.displayAll) {
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
  navigateToTheGroceryItemClickedByUser(childName: string, parentName: string, clickedOnChildName: boolean, displayAllButtonClicked: boolean) {
    console.log(clickedOnChildName, displayAllButtonClicked, childName, parentName)
    if (clickedOnChildName || displayAllButtonClicked) {
      this.router.navigate(['a/y'], {
        queryParams: {
          groceryType: childName,
          subMenu: clickedOnChildName,
          mainType: parentName,
          displayAll: displayAllButtonClicked
        }
      })
    } else {
      this.router.navigate(['a/y'], { queryParams: { groceryType: childName } })
    }
  }


  private extractBrands() {
    this.brandNamesWithCountMap = new Map()
    this.intactedGroceryList.forEach(value => {
      if (!this.brandNamesWithCountMap.has(value.brandName)) {
        this.brandNamesWithCountMap.set(value.brandName, 1);
      } else {
        //@ts-ignore
        this.brandNamesWithCountMap.set(value.brandName, this.brandNamesWithCountMap.get(value.brandName) + 1)
      }
    }
    )
  }


  loadNewPage($event: number) {
    const scrollTo: ScrollToOptions = {
      top: 0,
      left: 0,
      behavior: 'smooth'
    }
    this.pageNumber = $event;
    window.scrollTo(scrollTo)
  }
}

