export type Cafes = {
  id: number
  name: string
  photos: []
  average_rating?: number
  latitude: string
  longitude: string
  address: string
  description: string
  user_rating?: number
}[]

export interface Cafe {
  id: number
  name: string
  photos: []
  average_rating: number
  latitude: string
  longitude: string
  address: string
  description: string
}

export type Menu = {
  id: number
  name: string
  price: string
  image_src: null
  available: boolean
  has_options: boolean
}[]

export interface MenuItem {
  id: number
  name: string
  price: string
  image_src: null
  available: boolean
  options: {
    id: number
    name: string
    choices: {
      id: number
      name: string
      price: string
      available: boolean
      default: boolean
    }[]
  }[]
}

export interface Order {
  cafe: number
  ordered_products: OrderItem[]
}

export interface OrderItem {
  quantity: number
  product: number
  chosen_options: {
    name: string
    value: {
      name: string
      id: number
    }
  }[]
}

export interface HistoryOrder {
  id: number
  cafe: number
  order_num: string
  created_at: string
  completed_at: null
  total_sum: string
  status: string
  ordered_products: {
    id: number
    quantity: number
    product: {
      id: number
      name: string
      price: string
      image_src: null
    }
    chosen_options: {
      id: number
      name: string
      price: string
      product_option: {
        id: number
        name: string
      }
    }[]
  }[]
}
