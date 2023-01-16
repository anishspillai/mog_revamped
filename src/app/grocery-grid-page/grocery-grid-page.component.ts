import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BrandForFiltering } from '../shared/model/BrandForFiltering';
import { ShoppingCart } from '../shared/model/shopping-cart';
import { ShoppingcartService } from '../shared/observables/shoppingcart.service';
import { FirebasedbService } from '../shared/services/firebasedb.service';
import { IndividualGrocery } from '../shared/services/individual-grocery';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { SortLabelChangeService } from '../shared/services/sort-label-change.service';
@Component({
  selector: 'app-grocery-grid-page',
  templateUrl: './grocery-grid-page.component.html',
  styleUrls: ['./grocery-grid-page.component.scss'],


  /**animations: [
    trigger('visibleGroceries', [
      state('false', style({
        backgroundColor: 'green'
      })),
      transition('true => false', [
        animate('5000ms')
      ]),
    ])
  ]*/

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
  brands: BrandForFiltering[] = []
  displayAll: boolean;
  subMenu: boolean;

  constructor(private db: FirebasedbService,
    private activatedRouter: ActivatedRoute,
    private elementRef: ElementRef,
    private router: Router,
    private readonly cartService: ShoppingcartService,
    private readonly sortLabelChangeService: SortLabelChangeService
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
    window.scroll(0, 0)
    this.isAwaitingPageLoad = true
    this.groceryList = []
    this.intactedGroceryList = []
    this.pageNumber = 1
    this.sortLabelChangeService.triggerSortEvent(true)

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
    this.brands = []
    this.intactedGroceryList.forEach(value => {
      const brandAlreadyInFilter: BrandForFiltering | undefined = this.brands.find(val => val.brandName === value.brandName)
      if (brandAlreadyInFilter) {
        brandAlreadyInFilter.totalCount++
      } else {
        this.brands.push(new BrandForFiltering(value.brandName))
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

  assignFilteredData($event: IndividualGrocery[]) {
    this.pageNumber = 1
    window.scroll(0, 0)
    if ($event && $event.length > 0) {
      this.groceryList = $event
    } else {
      this.groceryList = this.intactedGroceryList
    }
  }
}