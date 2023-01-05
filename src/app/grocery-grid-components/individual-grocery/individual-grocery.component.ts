import { Component, Input } from '@angular/core';
import { windowWhen } from 'rxjs';
import { Order } from 'src/app/shared/model/order';
import { ShoppingCart } from 'src/app/shared/model/shopping-cart';
import { ShoppingcartService } from 'src/app/shared/observables/shoppingcart.service';
import { IndividualGrocery } from 'src/app/shared/services/individual-grocery';

@Component({
  selector: 'app-individual-grocery',
  templateUrl: './individual-grocery.component.html',
  styleUrls: ['./individual-grocery.component.scss']
})
export class IndividualGroceryComponent {

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