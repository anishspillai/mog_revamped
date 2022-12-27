import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../model/order';
import { AuthService } from '../services/auth.service';
import { FirebasedbService } from '../services/firebasedb.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  private orderSubject = new BehaviorSubject<Order[]>([])
  private shoppingCartItems: Order[] = []

  constructor(private db: FirebasedbService, private authService: AuthService) {
  }

  getOrdersObservable() {
    return this.orderSubject.asObservable()
  }

  emptyCart() {
    this.shoppingCartItems = []
    this.db.emptyShoppingCart(this.authService.getUserId()).catch(err => console.log(""))
    this.orderSubject.next(this.shoppingCartItems)
  }

  addGroceryToTheOrderList(order: Order) {
    this.shoppingCartItems.push(order)
    this.notifySubscribers()
  }

  incrementNoOfItems(noOfItems: number, id: string): void {
    this.updateCountOfItems(noOfItems, id)
  }

  decrementNoOfItems(noOfItems: number, id: string): void {

    if (noOfItems == 1) {
      this.shoppingCartItems = this.shoppingCartItems.filter(value => value.id != id)
      this.notifySubscribers()
    } else {
      this.updateCountOfItems(noOfItems, id)
    }
  }

  private updateCountOfItems(noOfItems: number, id: string) {
    const individualGroceryFromOrderedList = this.shoppingCartItems.find(element => element.id == id)
    if (individualGroceryFromOrderedList) {
      individualGroceryFromOrderedList.noOfItems = noOfItems
      this.notifySubscribers()
    }
  }

  getShoppingCartItems() {
    return this.shoppingCartItems
  }

  public notifySubscribers() {
    this.db.addToTheShoppingCart(this.authService.getUserId(), this.shoppingCartItems).then(r => console.log(""))
    this.orderSubject.next(this.shoppingCartItems)
  }

  public refillDataFromLocalStorageAndNotify() {
    if (this.shoppingCartItems.length == 0 && this.authService.isLoggedIn()) {
      this.db.getOrdersFromTheShoppingCart(this.authService.getUserId()).subscribe(value => {
        // @ts-ignore
        this.shoppingCartItems = value
        this.orderSubject.next(this.shoppingCartItems)
      }
      )
    }
  }

  public populateCartFromTheHistory(ordersFromTheHistory: Order[]) {
    this.shoppingCartItems = ordersFromTheHistory
    this.orderSubject.next(this.shoppingCartItems)
  }

  public getOrdersArray(): Order[] {
    return this.shoppingCartItems
  }
}
