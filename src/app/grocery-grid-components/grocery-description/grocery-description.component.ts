import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/model/shopping-cart';
import { ShoppingcartService } from 'src/app/shared/observables/shoppingcart.service';
import { IndividualGrocery } from 'src/app/shared/services/individual-grocery';

@Component({
  selector: 'app-grocery-description',
  templateUrl: './grocery-description.component.html',
  styleUrls: ['./grocery-description.component.scss']
})
export class GroceryDescriptionComponent {


  @Input() individualGrocery: IndividualGrocery
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private readonly cartService: ShoppingcartService) {
  }

  addToCart() {
    this.cartService.addToCart(this.individualGrocery);
  }

  isStockAvailable(): any {
    this.individualGrocery.stock && this.individualGrocery.stock > 0
  }

}
