import { Order, OrderItem } from '../types'
import getOrders from './getOrders'

const addOrderItem = (cafeID: number, orderItem: OrderItem) => {
  const orders = getOrders()
  const existingOrder = orders.find((item) => item.cafe === cafeID)
  if (existingOrder) {
    existingOrder.ordered_products.push(orderItem)
    sessionStorage.setItem(`orders`, JSON.stringify(orders))
  } else {
    sessionStorage.setItem(
      `orders`,
      JSON.stringify([
        { cafe: cafeID, ordered_products: [orderItem] },
      ] as Order[]),
    )
  }
}

export default addOrderItem
