import api from '../api'
import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { HistoryOrder } from '../types'

interface InitialState {
  activeOrders?: HistoryOrder[]
  finishedOrders?: HistoryOrder[]
}

export const ordersSlice = createSlice({
  name: `orders`,
  initialState: {} as InitialState,
  reducers: {
    setActiveOrders: (state, action) => {
      state.activeOrders = action.payload
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload
    },
  },
})

const { setActiveOrders, setFinishedOrders } = ordersSlice.actions

export const postOrder = (values: unknown) => async () => {
  return await api.post(`/api/orders`, values)
}

export const getActiveOrders = () => async (dispatch: Dispatch) => {
  const { data } = await api.get(`/api/orders`, {
    params: { status: `active` },
  })
  dispatch(setActiveOrders(data))
}

export const getFinishedOrders = () => async (dispatch: Dispatch) => {
  const { data } = await api.get(`/api/orders`, {
    params: { status: `completed` },
  })
  dispatch(setFinishedOrders(data))
}

export const patchOrder = (id: number, values: unknown) => async () => {
  await api.patch(`/api/orders/${id}`, values)
}

export default ordersSlice.reducer
