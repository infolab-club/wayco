import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { Cafes } from '../types'

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

export const getCafes = () => (dispatch: Dispatch) => {
  //setTimeout(() => dispatch(setCafes()))
}

export default cafesSlice.reducer
