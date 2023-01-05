import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/model/shopping-cart';
import { ShoppingcartService } from 'src/app/shared/observables/shoppingcart.service';
import { IndividualGrocery } from 'src/app/shared/services/individual-grocery';

@Component({
  selector: 'app-product-quantity-changer-buttons',
  templateUrl: './product-quantity-changer-buttons.component.html',
  styleUrls: ['./product-quantity-changer-buttons.component.scss']
})
export class ProductQuantityChangerButtonsComponent {

  @Input('product') product: IndividualGrocery;
  @Input('shopping-cart') shoppingCart: ShoppingCart; 

  constructor(private readonly cartService: ShoppingcartService) { }

  addToCart() {
  	this.cartService.addToCart(this.product);
  }

  removeFromCart() {
  	this.cartService.removeFromCart(this.product)
  }

}
