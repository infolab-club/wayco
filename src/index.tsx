import React from 'react'
import 'antd/dist/antd.less'
import ReactDOM from 'react-dom'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import session from './reducers/session'
import cafes from './reducers/cafes'
import cafe from './reducers/cafe'
import menu from './reducers/menu'
import orders from './reducers/orders'
import header from './reducers/header'
import { Provider } from 'react-redux'
import './index.scss'

const store = configureStore({
  reducer: { session, cafes, cafe, header, menu, orders },
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById(`root`),
)

export type RootState = ReturnType<typeof store.getState>
