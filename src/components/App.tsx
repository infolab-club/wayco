import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import Authorized from './Authorized'
import Unauthorized from './Unauthorized/Unauthorized'
import Login from './Unauthorized/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../index'
import { ReduxStatus } from '../config'
import { postRefreshToken } from '../reducers/session'
import Cafe from './Authorized/Cafe'
import Registration from './Unauthorized/Registration/Registration'
import Cart from './Authorized/Cart/Cart'
import Order from './Authorized/Order/Order'
import Profile from './Authorized/Profile/Profile'
import Success from './Authorized/Success/Success'
import Preloader from './Preloader/Preloader'

function App() {
  const { sessionStatus } = useSelector(
    (state: RootState) => state.session,
  )

  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (sessionStatus === ReduxStatus.idle) {
      dispatch(postRefreshToken())
    }
  }, [dispatch, sessionStatus])

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
            <Route exact path="/cart/success/:code">
              <Success />
            </Route>
            <Route exact path="/cart/:cafeID">
              <Order />
            </Route>
            <Route exact path="/profile">
              <Profile />
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
      <Preloader visible={sessionStatus === ReduxStatus.loading} />
    </>
  )
}

export default App
