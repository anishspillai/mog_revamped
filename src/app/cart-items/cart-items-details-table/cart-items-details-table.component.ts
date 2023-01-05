import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ShoppingCart } from 'src/app/shared/model/shopping-cart';
import { ShoppingcartService } from 'src/app/shared/observables/shoppingcart.service';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-cart-items-details-table',
  templateUrl: './cart-items-details-table.component.html',
  styleUrls: ['./cart-items-details-table.component.scss']
})
export class CartItemsDetailsTableComponent {
  cart$: Observable<ShoppingCart>;

  constructor(private readonly cartService: ShoppingcartService,
    private readonly router: Router) { }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.cartService.getCart();
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item)
  }

  moveToOrderPlacementPage(cart: ShoppingCart) {
    window.location.href = this.getOrderPageUrl(cart)
  }

  isOrderPage(): boolean {
    return this.router.url.includes("order")
  }

  getOrderPageUrl(cart: ShoppingCart): string {
    return "order?link=12faf651-cea3-4b8a-99ee-01abe4c4e4f9-kbddrdm&queryString=" + cart.totalPrice
  }


  clearCart() {
    if (confirm("You are going to remove all items from the cart. Are you sure to empty the cart?")) {
      this.cartService.clearCart()
    }
  }
}
