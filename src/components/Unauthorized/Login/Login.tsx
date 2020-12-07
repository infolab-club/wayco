import React from 'react'
import { Button, Form, Input } from 'antd'
import styles from './login.module.scss'
import { useDispatch } from 'react-redux'
import { postAuth } from '../../../reducers/session'

const Login = () => {
  const dispatch = useDispatch()

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
          Регистрация
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
