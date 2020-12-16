import { createSlice, Dispatch } from '@reduxjs/toolkit'
import api from '../api'
import { ReduxStatus } from '../config'
import { getToken } from '../helpers/getToken'

interface InitialState {
  sessionStatus: ReduxStatus
  authorized?: boolean
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
  const token = getToken()

  if (!token) {
    dispatch(setStatus(ReduxStatus.error))
    return
  }

  try {
    const { data } = await api.post(`/accounts/token/refresh`, {
      refresh: token.refresh,
    })
    api.defaults.headers.Authorization = `Bearer ${data.access}`
    dispatch(setStatus(ReduxStatus.success))
    localStorage.setItem(
      `token`,
      JSON.stringify({ ...token, access: data.access }),
    )
  } catch (err) {
    dispatch(setStatus(ReduxStatus.error))
    console.error(err)
  }
}

export const postAuth = (values: unknown) => async (dispatch: Dispatch) => {
  const { data } = await api.post(`/accounts/token`, values)
  api.defaults.headers.Authorization = `Bearer ${data.access}`
  dispatch(setStatus(ReduxStatus.success))
  localStorage.setItem(`token`, JSON.stringify(data))
}

export default sessionSlice.reducer
