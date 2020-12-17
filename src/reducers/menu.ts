import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { Menu, MenuItem } from '../types'
import api from '../api'

interface InitialState {
  menu?: Menu
  menuItem?: MenuItem
}

export const menuSlice = createSlice({
  name: `menu`,
  initialState: {} as InitialState,
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload
    },
    setMenuItem: (state, action) => {
      state.menuItem = action.payload
    },
  },
})

export const { setMenu, setMenuItem } = menuSlice.actions

export const getMenu = (cafeID: number) => async (dispatch: Dispatch) => {
  const { data } = await api.get(`/api/cafes/${cafeID}/menu`)
  dispatch(setMenu(data))
}

export const getMenuItem = (cafeID: number, itemID: number) => async (
  dispatch: Dispatch,
) => {
  const { data } = await api.get(`/api/cafes/${cafeID}/menu/${itemID}`)
  dispatch(setMenuItem(data))
}

export default menuSlice.reducer
