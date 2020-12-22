import React, { useEffect } from 'react'
import { Button, PageHeader } from 'antd'
import styles from './profile.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveOrders, getFinishedOrders } from '../../../reducers/orders'
import { resetSession } from '../../../reducers/session'
import { RootState } from '../../../index'

const Profile = () => {
  const { activeOrders, finishedOrders } = useSelector(
    (state: RootState) => state.orders,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getActiveOrders())
    dispatch(getFinishedOrders())
  }, [dispatch])

  return (
    <>
      <PageHeader title="Профиль" />
      <div className={styles.wrapper}>
        <Button danger size="large" onClick={() => dispatch(resetSession())}>
          Выйти
        </Button>
        <h4>Активные заказы</h4>
        {activeOrders?.map(() => (
          <p>asldkaskldm</p>
        ))}
        <h4>Завершённые заказы</h4>
        {finishedOrders?.map(() => (
          <p>asldkaskldm</p>
        ))}
      </div>
    </>
  )
}

export default Profile
