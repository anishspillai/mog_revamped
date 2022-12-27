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

      if (order.noOfItems >= order.bulkPurchaseOfferCount) {
        let totalSet = order.noOfItems / order.bulkPurchaseOfferCount
        sumOfIndividualOrder += Math.trunc(totalSet) * order.bulkPurchaseOfferPrice
      }

      let extraItems = order.noOfItems % order.bulkPurchaseOfferCount

      sumOfIndividualOrder += extraItems * order.actualPrice

    } else if (order.maxShoppingIsRestricted) {

      if (order.noOfItems <= order.maxShoppingCount) {
        sumOfIndividualOrder += order.noOfItems * order.offerPrice
      } else {
        let a = order.noOfItems - order.maxShoppingCount
        sumOfIndividualOrder += (a * order.actualPrice) + (order.maxShoppingCount * order.offerPrice)
      }

    } else {
      if (order.offerPrice == 0) {
        sumOfIndividualOrder += order.noOfItems * order.actualPrice
      } else {
        sumOfIndividualOrder += order.noOfItems * order.offerPrice
      }
    }
    return sumOfIndividualOrder
  }
}
