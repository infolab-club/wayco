import api from '../api'

export const postOrder = (values: unknown) => async () => {
  await api.post(`/api/orders`, values)
}
