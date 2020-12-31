import axios from 'axios'
import { BASE_URL } from './config'
import getToken from './helpers/getToken'
import { message } from 'antd'

const token = getToken()

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token.access}` : undefined,
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error)
    try {
      Object.entries(error.response.data).forEach(([key, value]) =>
        message.error(`${key}: ${(value as string[]).join(` `)}`),
      )
    } catch (err) {
      message.error(`Запрос завершился с ошибкой`)
    }
    return Promise.reject(error)
  },
)

export default api
