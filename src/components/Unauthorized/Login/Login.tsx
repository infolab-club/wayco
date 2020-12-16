import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import styles from './login.module.scss'
import { useDispatch } from 'react-redux'
import { setHeader } from '../../../reducers/header'
import { postAuth } from '../../../reducers/session'

const Login = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setHeader({ title: `Вход` }))
  }, [dispatch])

  const handleFinish = (values: unknown) => {
    dispatch(postAuth(values))
  }

  return (
    <Form className={styles.wrapper} onFinish={handleFinish}>
      <Form.Item label="Логин" name="username">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Пароль" name="password">
        <Input type="password" size="large" />
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit" block>
          Войти
        </Button>
      </Form.Item>
      <Form.Item>
        <Button size="large" block>
          <Link to="/registration">Регистрация</Link>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
