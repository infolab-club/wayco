import { Order, OrderItem } from '../types'
import getOrders from './getOrders'

const addOrderItem = (cafeID: number, orderItem: OrderItem) => {
  const orders = getOrders()
  const existingOrder = orders.find((item) => item.cafe === cafeID)
  if (existingOrder) {
    const existingProduct = existingOrder.ordered_products.find(
      (product) => product.product === orderItem.product,
    )
    if (existingProduct) existingProduct.quantity += orderItem.quantity
    else existingOrder.ordered_products.push(orderItem)
    localStorage.setItem(`orders`, JSON.stringify(orders))
  } else {
    localStorage.setItem(
      `orders`,
      JSON.stringify([
        { cafe: cafeID, ordered_products: [orderItem] },
      ] as Order[]),
    )
  }
}

export default addOrderItem
