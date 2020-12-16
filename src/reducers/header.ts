import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  title?: string
  previousPage?: string
}

export const headerSlice = createSlice({
  name: `headers`,
  initialState: {} as InitialState,
  reducers: {
    setHeader: (state, action: PayloadAction<InitialState>) => {
      state.title = action.payload.title
      state.previousPage = action.payload.previousPage
    },
  },
})

export const { setHeader } = headerSlice.actions

export default headerSlice.reducer
