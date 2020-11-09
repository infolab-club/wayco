import { createSlice, Dispatch } from '@reduxjs/toolkit'

/**
 "idle" (fetching not started yet)
 "loading" (currently fetching the session)
 "success" (session fetched successfully)
 "failure" (session failed to fetch)
 */

export const sessionSlice = createSlice({
  name: `session`,
  initialState: {
    status: `idle`,
    value: 0,
  },
  reducers: {
    doNothing: (state) => {
      state.value++
    },
  },
})

export const { doNothing } = sessionSlice.actions

export const doAsync = () => (dispatch: Dispatch) => {
  setTimeout(() => dispatch(doNothing()))
}

export default sessionSlice.reducer
