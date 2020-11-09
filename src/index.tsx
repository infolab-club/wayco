import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import projects from './reducers/session'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import './index.scss'

const store = configureStore({ reducer: projects })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
