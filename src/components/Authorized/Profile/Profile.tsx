import React, { useEffect } from 'react'
import { Button, Card, List, PageHeader } from 'antd'
import styles from './profile.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveOrders, getFinishedOrders } from 'reducers/orders'
import { resetSession } from 'reducers/session'
import { RootState } from 'index'
import { HistoryOrder } from 'types'

const Profile = () => {
  const { activeOrders, finishedOrders } = useSelector(
    (state: RootState) => state.orders,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getActiveOrders())
    dispatch(getFinishedOrders())
  }, [dispatch])

  const renderOrder = (order: HistoryOrder) => (
    <Card
      title={`Заказ ${order.order_num} на ${order.total_sum}₽`}
      key={order.id}
    >
      <List>
        {order.ordered_products.map((product) => (
          <List.Item key={product.id}>
            <p className={styles.highlighted}>
              {product.product.name}
              {!!parseInt(product.product.price) &&
                ` за ${parseInt(product.product.price)}₽`}
              , {product.quantity} шт
            </p>
            {product.chosen_options.map((option) => (
              <p key={option.id}>
                {option.product_option.name}: {option.name}
                {!!parseInt(option.price) && `, ${parseInt(option.price)}₽`}
              </p>
            ))}
          </List.Item>
        ))}
      </List>
    </Card>
  )

  return (
    <>
      <PageHeader title="Профиль" />
      <div className={styles.wrapper}>
        <Button danger size="large" onClick={() => dispatch(resetSession())}>
          Выйти
        </Button>
        {!!activeOrders?.length && <h4>Активные заказы</h4>}
        {activeOrders?.map(renderOrder).reverse()}
        {!!finishedOrders?.length && <h4>Завершённые заказы</h4>}
        {finishedOrders?.map(renderOrder).reverse()}
      </div>
    </>
  )
}

export default Profile
