import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { Order } from '../model/order';
import { ShoppingCart } from '../model/shopping-cart';
import { ShoppingCartItem } from '../model/shopping-cart-item';
import { AuthService } from '../services/auth.service';
import { FirebasedbService } from '../services/firebasedb.service';
import { IndividualGrocery } from '../services/individual-grocery';


@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {
  //this.shoppingCartItems.push(val.payload.val() as Order)
  //this.orderSubject.next(this.shoppingCartItems)




  constructor(private db: FirebasedbService) {

    /**this.db.getShoppingCartItems().snapshotChanges().subscribe(
      val => {
        //this.shoppingCartItems = []
        //if (val.payload.val() != null) {

        //console.log(JSON.stringify(val.payload.child))

        //this.shoppingCartItems.push(val.payload.val() as Order)
        //this.orderSubject.next(this.shoppingCartItems)
        new ShoppingCart(val.payload.val() as any)
        //}
      }
    )*/
  }

  async removeFromCart(product: IndividualGrocery) {
    this.updateItem(product, -1);
  }

  async addToCart(product: any) {
    this.updateItem(product, 1);
  }


  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.emptyShoppingCart(cartId)
  }

  private create() {
    return this.db.createShoppingCart()
  }


  private getItem(cartId: string, productId: string) {
    return this.db.getItemFromCart(cartId, productId)
  }


  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId;

    let result = this.create();
    window.alert("Coming here")
    localStorage.setItem('cartId', result.key || '{}');
    return result.key || ''
  }


  private async updateItem(product: IndividualGrocery, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);
    item$.snapshotChanges().pipe(take(1)).subscribe(element => {
      let item: ShoppingCartItem = element.payload.val() as unknown as ShoppingCartItem
      let quantity = (item?.quantity || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({
        brandName: product.brandName,
        imagePath: product.imagePath,
        actualPrice: product.actualPrice,
        quantity: quantity,
        type: product.type,
        subType: product.subType,
        weight: product.weight,
        unitOfWeight: product.unitOfWeight,
      });
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.getShoppingCartItems(cartId).snapshotChanges().pipe(map(val => new ShoppingCart(val.payload.val() as any)))
  }

}