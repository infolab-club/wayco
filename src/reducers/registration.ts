import api from 'api'

export const postConsumer = (values: unknown) => async () =>
  await api.post(`/accounts/consumers`, values)

export const postEmployee = (values: unknown) => async () =>
  await api.post(`/accounts/employeess`, values)

export const postUniqueLogin = (login: string) => async () =>
  await api.post(`/accounts/login-unique`, { login })
