import { Order } from "./order"

export class OrderHistoryModel {
    orderedTimestamp!: string
    orderHistory: Order[] = []
    orderKey: string
    deliveryStatus: number
  }