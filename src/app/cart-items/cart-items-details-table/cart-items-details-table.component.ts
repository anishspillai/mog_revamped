import { Component, Input } from '@angular/core';

import { Order } from 'src/app/shared/model/order';
import { ShoppingcartService } from 'src/app/shared/observables/shoppingcart.service';
@Component({
  selector: 'app-cart-items-details-table',
  templateUrl: './cart-items-details-table.component.html',
  styleUrls: ['./cart-items-details-table.component.scss']
})
export class CartItemsDetailsTableComponent {
  @Input() displayStockDecreamentOrIncreamentButton = false; // Display of PLUS and MINUS button for increasing/ decreasing of stock. Order confirmation page has value as false and side bar has as true
  
  ordersAddedByUser: Order[] = []

  constructor(private readonly shoppingCartService: ShoppingcartService) { }

  ngOnInit(): void {
    this.shoppingCartService.getOrdersObservable().subscribe(value => {
      this.ordersAddedByUser = value
    })
  }

}
