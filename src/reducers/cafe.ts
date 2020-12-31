import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { Cafe, HistoryOrder } from '../types'
import api from '../api'

interface InitialState {
  cafe?: Cafe
  activeOrders?: HistoryOrder[]
  finishedOrders?: HistoryOrder[]
}

export const cafeSlice = createSlice({
  name: `cafe`,
  initialState: {} as InitialState,
  reducers: {
    setCafe: (state, action) => {
      state.cafe = action.payload
    },
    setActiveOrders: (state, action) => {
      state.activeOrders = action.payload
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload
    },
  },
})

export const { setCafe, setFinishedOrders, setActiveOrders } = cafeSlice.actions

export const getCafe = (id: number) => async (dispatch: Dispatch) => {
  const { data } = await api.get(`/api/cafes/${id}`)
  dispatch(setCafe(data))
}

export const getActiveOrders = () => async (dispatch: Dispatch) => {
  const { data } = await api.get(`/api/orders`, {
    params: { status: `active`, cafe: true },
  })
  dispatch(setActiveOrders(data))
}

export const getFinishedOrders = () => async (dispatch: Dispatch) => {
  const { data } = await api.get(`/api/orders`, {
    params: { status: `completed`, cafe: true },
  })
  dispatch(setFinishedOrders(data))
}

export const putCafe = (cafeID: number, values: unknown) => async (
  dispatch: Dispatch,
) => {
  const { data } = await api.put(`/api/cafes/${cafeID}`, values)
  dispatch(setCafe(data))
}

export default cafeSlice.reducer
