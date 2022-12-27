import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../shared/model/order';
import { SearchService } from '../shared/observables/search.service';
import { ShoppingcartService } from '../shared/observables/shoppingcart.service';
import { GroceryUtil } from '../shared/util/grocery-util';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  
  searchString: string | undefined;
  cartItems: Order[] = []

  constructor(private searchService: SearchService,
    private readonly router: Router,
    private readonly shoppingCart: ShoppingcartService,
    private readonly groceryUtil: GroceryUtil) {
  }

  ngOnInit(): void {
    this.shoppingCart.getOrdersObservable().subscribe(value => {
      this.cartItems = value
    })
  }

  textInputChange(inputString: string) {
    this.searchService.sendNotificationToTheListener(inputString)
    this.router.navigate(['/a/search-result'])
  }

  getCountOfItems() {
    const sum = this.cartItems.reduce((sum, current) =>
      sum + current.noOfItems, 0)
    return sum
  }

  getCostOfItemsInCart(): number {
    return this.groceryUtil.getTotalCostOfOrderedItems(this.cartItems)
  }

}
