import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Order } from '../model/order';
import { ShoppingCartItem } from '../model/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class FirebasedbService {

  getGroceriesList(isSubCategory: boolean, groceryName: string) {
    const searchCategoryString = isSubCategory ? 'subCatagory' : 'catagory'
    return this.angularFireDataBase.list('admin/Products', ref => ref.orderByChild(searchCategoryString).equalTo(groceryName)).snapshotChanges()
  }

  constructor(private readonly angularFireDataBase: AngularFireDatabase) { }

  getOrderHistoryOfTheUser(userId: string) {
    return this.angularFireDataBase.list('users/order-history/', ref => ref.orderByChild("userId").equalTo(userId)).snapshotChanges()
  }

  getProductCategoriesForMenuDisplay() {
    return this.angularFireDataBase.list('admin/Product_Catagory').snapshotChanges()
  }

  getMenuItemsByParentGroceryName(parentGroceryName: string) {
    return this.angularFireDataBase.list("admin/Product_Catagory" + '/' + parentGroceryName).snapshotChanges()
  }

  getMenuItems() {
    return this.angularFireDataBase.list("admin/Product_Catagory").snapshotChanges()
  }

  getOrdersFromTheShoppingCart(key: string) {
    return this.angularFireDataBase.list("/users/shopping-cart/" + key).valueChanges()
  }

  getUserDetails(userId: string) {
    return this.angularFireDataBase.object('users/test/USERS/' + userId).valueChanges()
  }

  getOrderHistory(userId: string) {
    //return this.angularFireDatabase.list('users/order-lists/' + userId).snapshotChanges()
    return this.angularFireDataBase.list('users/test/ORDER', ref => ref.orderByChild("userId").equalTo(userId)).snapshotChanges()
  }

  getShoppingCartItems(cartId: any) {
    return this.angularFireDataBase.object("/users/shopping-cart-anish/" + cartId)
  }

  /**
   * ALL METHODS FOR SHOPING CART
   */


  createShoppingCart() {
    //https://doorstep-groceries.firebaseapp.com/?category=bread
    //https://github.com/kavalakuntla/Online-Grocery-Store
    // https://codelabs.developers.google.com/codelabs/firebase-web/?fbclid=IwAR2FBNNmHcOdtYpkcDMFR8U0eMiEZVrbcksK8ej75kuxnA_JkpYdmCK_Qfg#0
    return this.angularFireDataBase.list("/users/shopping-cart").push({ dateCreated: new Date().getTime() })
  }

  addToTheShoppingCart(key: string, order: Order[]) {
    //https://doorstep-groceries.firebaseapp.com/?category=bread
    //https://github.com/kavalakuntla/Online-Grocery-Store
    return this.angularFireDataBase.object("/users/shopping-cart/" + key).set(order)
  }

  emptyShoppingCart(key: string) {
    return this.angularFireDataBase.object("/users/shopping-cart-anish/" + key).remove()
  }

  getItemFromCart(cartId: string, productId: string) {
    return this.angularFireDataBase.object('/users/shopping-cart-anish/'+ cartId + "/" + productId);
  }

  async placeOrder(userId: string | undefined, order: any) {
    let orderPlacementTime: number = Date.now()
    let orderKey = userId as string + orderPlacementTime
    this.angularFireDataBase.object("/users/test/ORDER/" + orderKey).set({ userId, orderPlacementTime , order })
  }

  addUserDataToDb(userId: string, value: any) {
    return this.angularFireDataBase.object("/users/test/USERS/" + userId ).set(value)
  }
}
