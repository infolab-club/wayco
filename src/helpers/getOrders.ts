import { Order } from 'types'

interface GetOrders {
  (): Order[]
}

const getOrders: GetOrders = () => {
  try {
    const orders = JSON.parse(sessionStorage.getItem(`orders`) || `[]`)
    if (Array.isArray(orders)) return orders
    else return []
  } catch (err) {
    console.error(err)
    return []
  }
}

export default getOrders
