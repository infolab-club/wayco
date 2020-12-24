import { createSlice, Dispatch } from '@reduxjs/toolkit'
import api from '../api'
import { ReduxStatus } from '../config'
import getToken from '../helpers/getToken'

interface InitialState {
  sessionStatus: ReduxStatus
  authorized?: boolean
  productsCount?: number
  groups?: ('employees' | 'consumers' | 'cafe_admins')[]
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
    setProductsCount: (state, action) => {
      state.productsCount = action.payload
    },
    setGroups: (state, action) => {
      state.groups = action.payload
    },
    resetSession: (state) => {
      state.sessionStatus = ReduxStatus.idle
      state.authorized = undefined
      state.productsCount = undefined
      state.groups = undefined
      localStorage.clear()
      sessionStorage.clear()
    },
  },
})

export const {
  setStatus,
  setProductsCount,
  resetSession,
  setGroups,
} = sessionSlice.actions

export const postRefreshToken = () => async (dispatch: Dispatch) => {
  const token = getToken()
  dispatch(setStatus(ReduxStatus.loading))

  if (!token) {
    dispatch(setStatus(ReduxStatus.error))
    return
  }

  try {
    const { data } = await api.post(`/accounts/token/refresh`, {
      refresh: token.refresh,
    })
    api.defaults.headers.Authorization = `Bearer ${data.access}`
    localStorage.setItem(
      `token`,
      JSON.stringify({ ...token, access: data.access }),
    )
    await getGroups()(dispatch)
    dispatch(setStatus(ReduxStatus.success))
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

export const getGroups = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.get(`/accounts/check-groups`)
    dispatch(setGroups(data.groups))
    dispatch(setStatus(ReduxStatus.success))
  } catch (err) {
    console.error(err)
    dispatch(setStatus(ReduxStatus.error))
  }
}

export default sessionSlice.reducer
