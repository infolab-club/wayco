import axios from 'axios'
import { BASE_URL } from './config'
import { getToken } from './helpers/getToken'

const token = getToken()

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token.access}` : undefined,
  },
})

export default api
