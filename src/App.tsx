import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import Authorized from './components/Authorized/Authorized'
import Unauthorized from './components/Unauthorized/Unauthorized'
import Login from './components/Unauthorized/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './index'
import { ReduxStatus } from './config'
import { postRefreshToken } from './reducers/session'
import Cafe from './components/Authorized/Cafe'
import Registration from './components/Unauthorized/Registration/Registration'
import Cart from './components/Authorized/Cart/Cart'
import Order from './components/Authorized/Order/Order'

function App() {
  const { sessionStatus } = useSelector((state: RootState) => state.session)

  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(postRefreshToken())
  }, [dispatch])

  return (
    <>
      {sessionStatus === ReduxStatus.success && (
        <Authorized>
          <Switch>
            <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
            <Route exact path="/cafes/:cafeID?">
              <Cafe />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/cart/:cafeID">
              <Order />
            </Route>
            <Redirect to="/cafes" />
          </Switch>
        </Authorized>
      )}
      {sessionStatus === ReduxStatus.error && (
        <Unauthorized>
          <Switch>
            <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Redirect to="/login" />
          </Switch>
        </Unauthorized>
      )}
    </>
  )
}

export default App
