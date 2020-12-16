import React from 'react'
import 'antd/dist/antd.css'
import ReactDOM from 'react-dom'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import session from './reducers/session'
import cafes from './reducers/cafes'
import cafe from './reducers/cafe'
import { Provider } from 'react-redux'
import './index.scss'

const store = configureStore({ reducer: { session, cafes, cafe } })

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById(`root`),
)

export type RootState = ReturnType<typeof store.getState>
