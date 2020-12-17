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
