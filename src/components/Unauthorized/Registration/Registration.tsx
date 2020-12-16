import React, { useEffect, useState } from 'react'
import { Form, message, Tabs } from 'antd'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setHeader } from '../../../reducers/header'
import ConsumerForm from './ConsumerForm/ConsumerForm'
import styles from './registration.module.scss'
import EmployeeForm from './EmployeeForm/EmployeeForm'
import { postConsumer, postEmployee } from '../../../reducers/registration'

const Registration = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [tab, setTab] = useState(`consumer`)

  useEffect(() => {
    dispatch(setHeader({ title: `Регистрация`, previousPage: `/login` }))
  }, [dispatch])

  const handleFinish = async (values: unknown) => {
    try {
      if (tab === `consumer`) await dispatch(postConsumer(values))
      if (tab === `employee`) await dispatch(postEmployee(values))
      message.success(`Пользователь создан`)
      history.push(`/login`)
    } catch (err) {
      console.error(err)
      message.error(`Ошибка создания пользователя`)
    }
  }

  return (
    <Form className={styles.wrapper} onFinish={handleFinish}>
      <Tabs activeKey={tab} onChange={setTab}>
        <Tabs.TabPane key="consumer" tab="Пользователь">
          <ConsumerForm />
        </Tabs.TabPane>
        <Tabs.TabPane key="employee" tab="Сотрудник">
          <EmployeeForm />
        </Tabs.TabPane>
      </Tabs>
    </Form>
  )
}

export default Registration
