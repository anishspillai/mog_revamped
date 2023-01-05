import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../shared/model/shopping-cart';
import { ShoppingcartService } from '../shared/observables/shoppingcart.service';
import { AddresscheckService } from '../shared/services/addresscheck.service';
import { AlertService } from '../shared/services/alert.service';
import { AuthService } from '../shared/services/auth.service';
import { FirebasedbService } from '../shared/services/firebasedb.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {

  price: number
  userSubscription: Subscription;
  userId: string | undefined;
  cart$: Observable<ShoppingCart>;
  isAddressValid = false
  alertSubscription: Subscription;
  orderBeingPlaced = false;


  constructor(private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private cartService: ShoppingcartService,
    private db: FirebasedbService,
    private readonly addressChecker: AddresscheckService,
    private readonly alertService: AlertService,
    private readonly router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user?.uid);
    this.cart$ = await this.cartService.getCart();
    this.alertSubscription = this.addressChecker.onAddressChange().subscribe((val) => {
      this.isAddressValid = val
    })

    this.activatedRouter.queryParamMap.subscribe(async params => {
      this.price = params.get("queryString") as unknown as number
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.alertSubscription.unsubscribe()
  }

  placeOrder() {
    this.orderBeingPlaced = true
    this.cart$.subscribe(async val => {
      if (val.items.length > 0) {
        let result = await this.db.placeOrder(this.userId, val.items);
        this.cartService.clearCart();
        localStorage.removeItem('cartId')
        this.orderBeingPlaced = false
        this.alertService.successAlert("Thank you placing the order!. Please check your order history for the details.")
        this.router.navigate(['a/oh'])
      }
    })
  }

  setAddressInvalid($event: boolean) {
    this.isAddressValid = $event
  }

}
