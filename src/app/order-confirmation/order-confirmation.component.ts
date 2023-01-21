import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from '../shared/model/shopping-cart-item';
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
  emailId: string | undefined;
  isAddressValid = false
  alertSubscription: Subscription;
  orderBeingPlaced = false;
  items: ShoppingCartItem[] = [];

  constructor(private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private cartService: ShoppingcartService,
    private db: FirebasedbService,
    private readonly addressChecker: AddresscheckService,
    private readonly alertService: AlertService,
    private readonly router: Router,
    private readonly httpClient: HttpClient) {
  }

  async ngOnInit(): Promise<void> {

    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user?.uid
      this.emailId = user?.email as string
    });

    (await this.cartService.getCart()).subscribe(val => {
      this.items = val.items
    });

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

  async placeOrder() {
    this.orderBeingPlaced = true
    let orderPlaced = false
    try {
      let result = await this.db.placeOrder(undefined, this.items);
      orderPlaced = true
      await this.updateCountOfGroceries()
      await this.cartService.clearCart();
      localStorage.removeItem('cartId')
      await this.sendOrderDetailsEmail(result)
      this.alertService.successAlert("Thank you placing the order!. Please check your order history for the details.")
      this.orderBeingPlaced = false
      this.router.navigate(['a/oh'])
    } catch (error) {
      if (!orderPlaced) {
        this.alertService.failurAlert("Unfortunately, Order placement is failed. We will contact you soon")
      }

      let message = this.getMessageFromError(error)
      message = "ORDER_PLACEMENT -- " + message + ". VALUE OF the orderPlaced ( false means, CRITICAL ) boolean is " + orderPlaced
      this.db.storeErrorDetails(this.userId, this.emailId, message, localStorage.getItem('cartId'))
    }
  }

  setAddressInvalid($event: boolean) {
    this.isAddressValid = $event
  }

  private async updateCountOfGroceries() {
    this.items.forEach(orderedGrocery => {
      this.db.updateTheCountInDataBase(orderedGrocery)
    })
  }



  private async sendOrderDetailsEmail(orderId: any) {
    this.authService.getCurrentUser()?.then(tokenId => {
      const authenticationTokenHeader = new HttpHeaders({
        Authorization: 'Bearer ' + tokenId
      });

      let queryParams = new HttpParams();
      if (this.emailId) {
        queryParams = queryParams.append("orderId", orderId).append("emailId", this.emailId);
      }

      //http://ec2-13-53-187-185.eu-north-1.compute.amazonaws.com:8080/order
      this.httpClient.get("http://ec2-13-53-187-185.eu-north-1.compute.amazonaws.com:8080/order", {
        headers: authenticationTokenHeader,
        params: queryParams
      }).subscribe({
        next: (success) => {
          // Do Nothing
        },
        error: (error) => {
          let message = this.getMessageFromError(error)
          message = "EMAIL_NOT_SENT_FOR_ORDER_PLACEMENT -- " + message
          this.db.storeErrorDetails(this.userId, this.emailId, message, undefined)
        }
      });
    })
  }

  private getMessageFromError(error: unknown) {
    if (error instanceof Error) {
      return error.message
    } else {
      return String(error)
    }
  }

}

