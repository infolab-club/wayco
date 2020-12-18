import React, { useEffect } from 'react'
import { Badge, Menu } from 'antd'
import {
  EnvironmentOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import styles from './dockBar.module.scss'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../index'
import { setProductsCount } from '../../../reducers/session'
import getOrders from '../../../helpers/getOrders'

const DockBar = () => {
  const { productsCount } = useSelector((state: RootState) => state.session)

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const orders = getOrders()
    dispatch(
      setProductsCount(orders.length && orders[0].ordered_products.length),
    )
  }, [dispatch])

  return (
    <Menu
      mode="horizontal"
      className={styles.wrapper}
      selectedKeys={[history.location.pathname.split(`/`)[1]]}
      onClick={({ key }) => history.push(`/${key}`)}
    >
      <Menu.Item key="cafes" icon={<EnvironmentOutlined />} />
      <Menu.Item
        key="cart"
        icon={
          <Badge count={productsCount} size="small">
            <ShoppingCartOutlined />
          </Badge>
        }
      />
      <Menu.Item key="favourites" icon={<HeartOutlined />} />
      <Menu.Item key="profile" icon={<UserOutlined />} />
    </Menu>
  )
}

export default DockBar
