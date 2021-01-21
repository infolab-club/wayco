import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './cart.module.scss'
import { Card, Empty, PageHeader } from 'antd'
import { getCafes } from 'reducers/cafes'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'index'
import getOrders from 'helpers/getOrders'

const Cart = () => {
  const { cafes } = useSelector((state: RootState) => state.cafes)

  const dispatch = useDispatch()
  const orders = getOrders()

  useEffect(() => {
    dispatch(getCafes())
  }, [dispatch])

  return (
    <>
      <PageHeader title="Корзина" />
      <div className={styles.wrapper}>
        {orders.length ? (
          orders.map((order) => (
            <Link to={`/cart/${order.cafe}`} key={order.cafe}>
              <Card>
                <h4>{cafes?.find((cafe) => cafe.id === order.cafe)?.name}</h4>
              </Card>
            </Link>
          ))
        ) : (
          <Empty
            className={styles.empty}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="В корзине пусто"
          />
        )}
      </div>
    </>
  )
}

export default Cart
