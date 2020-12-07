import { createSlice, Dispatch } from '@reduxjs/toolkit'
import api from '../api'
import { ReduxStatus } from '../config'

interface InitialState {
  sessionStatus: ReduxStatus
  authorized?: boolean
}

interface Token {
  access: string
  refresh: string
}

export const sessionSlice = createSlice({
  name: `session`,
  initialState: {
    sessionStatus: ReduxStatus.idle,
  } as InitialState,
  reducers: {
    setStatus: (state, action) => {
      state.sessionStatus = action.payload
    },
  },
})

const { setStatus } = sessionSlice.actions

export const postRefreshToken = () => async (dispatch: Dispatch) => {
  const token: Token = JSON.parse(localStorage.getItem(`token`) || `{}`)
  try {
    const { data } = await api.post(`/accounts/token/refresh`, {
      refresh: token.refresh,
    })
    api.defaults.headers.common.Authorization = `Bearer ${data.access}`
    dispatch(setStatus(ReduxStatus.success))
    localStorage.setItem(
      `token`,
      JSON.stringify({ ...token, access: data.access }),
    )
  } catch (err) {
    dispatch(setStatus(ReduxStatus.error))
    console.log(new Error(err))
  }
}

export const postAuth = (values: unknown) => async (dispatch: Dispatch) => {
  const { data } = await api.post(`/accounts/token`, values)
  api.defaults.headers.common.Authorization = `Bearer ${data.access}`
  dispatch(setStatus(ReduxStatus.success))
  localStorage.setItem(
    `token`,
    JSON.stringify(data),
  )
}

export default sessionSlice.reducer
