import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { map, Observable, take } from 'rxjs';
import { Order } from '../model/order';

import { ShoppingCart } from '../model/shopping-cart';
import { IndividualGrocery } from './individual-grocery';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart[]>> {
    let cartId = await this.getOrCreateCartId();
    const anish = this.db.list<ShoppingCart>('/users/shopping-carts/' + cartId).snapshotChanges()
    const anish1 = anish.pipe(map(changes => {
      return changes.map(c => c.payload.val())
    }))
    // @ts-ignore
    return anish1;
  }

  async addToCart(product: IndividualGrocery) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: IndividualGrocery) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async create() {
    return this.db.list("/users/shopping-cart-anish").push({ dateCreated: new Date().getTime() })
  }


  private getItem(cartId: string, productId: string) {
    return this.db.object('/users/shopping-carts-anish/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key || '{}');
    return result.key || ''
  }

  private async updateItem(product: IndividualGrocery, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.snapshotChanges().pipe(take(1)).subscribe(element => {
      let item: Order = element as unknown as Order
  		let quantity =  (item.noOfItems || 0) + change;
  		if (quantity === 0) item$.remove();
  		else item$.update({
  			title: product.brandName,
  			imageUrl: product.brandName,
  			price: product.actualPrice,
  			quantity: quantity
  		});
  	})
  }

}