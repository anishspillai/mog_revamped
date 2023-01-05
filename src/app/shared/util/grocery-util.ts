import { Order } from "../model/order";

export class GroceryUtil {


  getTotalCostOfOrderedItems(orders: Order[]): number {
    if (!orders) {
      return 0
    }
    let sumOfItems: number = 0;

    for (let i = 0; i < orders.length; i++) {
      sumOfItems += orders[i].actualPrice 
      console.log(sumOfItems)
    }

    return sumOfItems
  }

  getSumOfGrocery(order: Order) {

    let sumOfIndividualOrder = 0

    if (order.bulkPurchaseOfferAvailable) {

      if (order.quantity >= order.bulkPurchaseOfferCount) {
        let totalSet = order.quantity / order.bulkPurchaseOfferCount
        sumOfIndividualOrder += Math.trunc(totalSet) * order.bulkPurchaseOfferPrice
      }

      let extraItems = order.quantity % order.bulkPurchaseOfferCount

      sumOfIndividualOrder += extraItems * order.actualPrice

    } else if (order.maxShoppingIsRestricted) {

      if (order.quantity <= order.maxShoppingCount) {
        sumOfIndividualOrder += order.quantity * order.offerPrice
      } else {
        let a = order.quantity - order.maxShoppingCount
        sumOfIndividualOrder += (a * order.actualPrice) + (order.maxShoppingCount * order.offerPrice)
      }

    } else {
      if (order.offerPrice == 0) {
        sumOfIndividualOrder += order.quantity * order.actualPrice
      } else {
        sumOfIndividualOrder += order.quantity * order.offerPrice
      }
    }
    return sumOfIndividualOrder
  }
}
