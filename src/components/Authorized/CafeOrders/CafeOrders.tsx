import React, { useEffect, useState } from 'react'
import { Card, List, PageHeader, Typography } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import styles from './cafeOrders.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveOrders, getFinishedOrders } from '../../../reducers/cafe'
import { RootState } from '../../../index'
import { HistoryOrder } from '../../../types'
import OrderModal from './OrderModal/OrderModal'
import { useHistory } from 'react-router-dom'

const orderStatusToText = {
  active: `Активен`,
  ready: `Готов`,
  claimed: `Отдан`,
  unclaimed: `Не отдан`,
}

const orderStatusToType: {
  active: 'warning'
  ready: 'success'
  claimed: 'secondary'
  unclaimed: 'danger'
} = {
  active: `warning`,
  ready: `success`,
  claimed: `secondary`,
  unclaimed: `danger`,
}

const CafeOrders = () => {
  const { groups } = useSelector((state: RootState) => state.session)
  const { activeOrders, finishedOrders } = useSelector(
    (state: RootState) => state.cafe,
  )

  const dispatch = useDispatch()
  const history = useHistory()

  const [modalVisible, setModalVisible] = useState(false)
  const [order, setOrder] = useState<HistoryOrder>()

  useEffect(() => {
    dispatch(getActiveOrders())
    dispatch(getFinishedOrders())
  }, [dispatch])

  const handleOpenModal = (order: HistoryOrder) => {
    setOrder(order)
    setModalVisible(true)
  }

  const renderOrder = (order: HistoryOrder) => (
    <Card
      title={`Заказ ${order.order_num} на ${order.total_sum}₽`}
      key={order.id}
      onClick={() => handleOpenModal(order)}
    >
      <List>
        {order.ordered_products.map((product) => (
          <List.Item key={product.id}>
            <p className={styles.highlighted}>
              {product.product.name}, {product.quantity} шт
            </p>
            {product.chosen_options.map((option) => (
              <p key={option.id}>
                {option.product_option.name}: {option.name}
              </p>
            ))}
          </List.Item>
        ))}
        <List.Item>
          <Typography.Text type={orderStatusToType[order.status]}>
            {orderStatusToText[order.status]}
          </Typography.Text>
        </List.Item>
      </List>
    </Card>
  )

  return (
    <>
      <PageHeader
        title="Кофейня"
        className={styles.header}
        extra={
          groups?.includes(`cafe_admins`) && (
            <SettingOutlined
              className={styles.settings}
              onClick={() => history.push(`/cafe/manage`)}
            />
          )
        }
      />
      <div className={styles.wrapper}>
        <h4>Активные заказы</h4>
        {activeOrders && !activeOrders?.length && `Активных заказов нет`}
        {activeOrders?.map(renderOrder).reverse()}
        <h4>Завершённые заказы</h4>
        {finishedOrders && !finishedOrders?.length && `Завершённых заказов нет`}
        {finishedOrders?.map(renderOrder).reverse()}
      </div>
      <OrderModal
        visible={modalVisible}
        setVisible={setModalVisible}
        order={order}
      />
    </>
  )
}

export default CafeOrders
