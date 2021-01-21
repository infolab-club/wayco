import React from 'react'
import { Button, Form, Input } from 'antd'
import { postUniqueLogin } from 'reducers/registration'
import { useDispatch } from 'react-redux'

const ConsumerForm = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Form.Item
        label="Логин"
        name="username"
        rules={[
          {
            required: true,
            message: 'Введите логин',
          },
          () => ({
            validator: async (rule, value) => {
              const { data }: any = await dispatch(postUniqueLogin(value))
              if (data.username_status === `free`) return Promise.resolve()
              else return Promise.reject(`Логин занят`)
            },
          }),
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: 'Введите пароль',
          },
          () => ({
            validator(rule, value) {
              if (value && value.length >= 8) {
                return Promise.resolve()
              }
              return Promise.reject(`Минимальная длина пароля - 8 символов`)
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password size="large" />
      </Form.Item>
      <Form.Item
        name="password_confirmation"
        label="Повтор пароля"
        dependencies={[`password`]}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Введите пароль',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue(`password`) === value) {
                return Promise.resolve()
              }
              return Promise.reject(`Пароли не совпадают`)
            },
          }),
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>
      <Form.Item
        label="Код регистрации"
        name="registration_code"
        rules={[
          {
            required: true,
            message: 'Введите код регистрации',
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit" block>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </>
  )
}

export default ConsumerForm
