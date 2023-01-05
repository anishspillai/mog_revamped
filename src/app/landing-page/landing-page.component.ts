import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Order } from '../shared/model/order';
import { ShoppingCart } from '../shared/model/shopping-cart';
import { SearchService } from '../shared/observables/search.service';
import { ShoppingcartService } from '../shared/observables/shoppingcart.service';
import { AuthService } from '../shared/services/auth.service';
import { GroceryUtil } from '../shared/util/grocery-util';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  searchString: string | undefined;
  cart$: Observable<ShoppingCart>;

  constructor(private searchService: SearchService,
    private readonly router: Router,
    private readonly cartService: ShoppingcartService,
    private readonly authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.cartService.getCart();
  }

  textInputChange(inputString: string) {
    this.searchService.sendNotificationToTheListener(inputString)
    this.router.navigate(['/a/search-result'])
  }

  get firebaseAuthObject() {
    return this.authService.afAuth
  }

  logOut() {
    this.authService.logout()
  }

}
