import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { Cafes } from 'types'
import api from 'api'

interface InitialState {
  cafes?: Cafes
}

export const cafesSlice = createSlice({
  name: `cafes`,
  initialState: {} as InitialState,
  reducers: {
    setCafes: (state, action) => {
      state.cafes = action.payload
    },
  },
})

export const { setCafes } = cafesSlice.actions

export const getCafes = () => async (dispatch: Dispatch) => {
  const { data } = await api.get(`/api/cafes`)
  dispatch(setCafes(data))
}

export default cafesSlice.reducer
