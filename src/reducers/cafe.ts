import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { Cafe } from '../types'
import api from '../api'

interface InitialState {
  cafe?: Cafe
}

export const cafeSlice = createSlice({
  name: `cafe`,
  initialState: {} as InitialState,
  reducers: {
    setCafe: (state, action) => {
      state.cafe = action.payload
    },
  },
})

export const { setCafe } = cafeSlice.actions

export const getCafe = (id: number) => async (dispatch: Dispatch) => {
  const { data } = await api.get(`/api/cafes/${id}`)
  dispatch(setCafe(data))
}


export default cafeSlice.reducer
