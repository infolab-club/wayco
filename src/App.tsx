import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Authorized from './components/Authorized/Authorized'
import Unauthorized from './components/Unauthorized/Unauthorized'
import Login from './components/Unauthorized/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './index'
import { ReduxStatus } from './config'
import { postRefreshToken } from './reducers/session'

function App() {
  const dispatch = useDispatch()

  const { sessionStatus } = useSelector((state: RootState) => state.session)

  useEffect(() => {
    dispatch(postRefreshToken())
  }, [dispatch])

  return (
    <Switch>
      {sessionStatus === ReduxStatus.success && (
        <Authorized>
          <Redirect to="/map" />
        </Authorized>
      )}
      {sessionStatus === ReduxStatus.error && (
        <Unauthorized>
          <Route path="/login">
            <Login />
          </Route>
          <Redirect to="/login" />
        </Unauthorized>
      )}
    </Switch>
  )
}

export default App
