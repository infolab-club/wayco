import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import styles from './login.module.scss'
import { useDispatch } from 'react-redux'
import { setHeader } from '../../../reducers/header'
import { postAuth } from '../../../reducers/session'

const Login = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(setHeader({ title: `Вход` }))
  }, [dispatch])

  const handleFinish = async (values: unknown) => {
    try {
      setLoading(true)
      await dispatch(postAuth(values))
    } catch (err) {
      console.error(err)
      setLoading(false)
      message.error(`Ошибка входа`)
    }
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
        <Button
          block
          size="large"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
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
