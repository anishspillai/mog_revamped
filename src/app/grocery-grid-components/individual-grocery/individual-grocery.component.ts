import { Component, Input } from '@angular/core';
import { windowWhen } from 'rxjs';
import { Order } from 'src/app/shared/model/order';
import { ShoppingcartService } from 'src/app/shared/observables/shoppingcart.service';
import { IndividualGrocery } from 'src/app/shared/services/individual-grocery';

@Component({
  selector: 'app-individual-grocery',
  templateUrl: './individual-grocery.component.html',
  styleUrls: ['./individual-grocery.component.scss']
})
export class IndividualGroceryComponent {



  @Input() individualGrocery: IndividualGrocery | undefined

  constructor(private shoppingCartService: ShoppingcartService) {

  }

  stockCount(): number {
    if (this.individualGrocery) {
      return this.individualGrocery.stock === undefined ? 0 : this.individualGrocery.stock
    }
    return 0
  }

  isItemNotAddedIntoTheCartAlready() {
    const individualGroceryFromOrderedList = this.shoppingCartService.getShoppingCartItems().find(element => element.id == this.individualGrocery?.id)
    return individualGroceryFromOrderedList === null || individualGroceryFromOrderedList === undefined
  }

  addItemToTheCart() {
    if (this.individualGrocery) {
      const order: Order = Order.createThisObjectFromIndividualGrocerObject(this.individualGrocery)
      this.shoppingCartService.addGroceryToTheOrderList(order)
    }
  }
}