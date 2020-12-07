import axios from 'axios'
import { BASE_URL } from './config'

interface Token {
  access: string
  refresh: string
}

const token: Token = JSON.parse(localStorage.getItem(`token`) || `{}`)

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token.access}` : undefined,
  },
})

export default api
