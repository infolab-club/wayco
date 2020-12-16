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
