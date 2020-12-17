import React from 'react'
import { Menu } from 'antd'
import {
  EnvironmentOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import styles from './dockBar.module.scss'
import { useLocation } from 'react-router-dom'

const DockBar = () => {
  const location = useLocation()

  return (
    <Menu
      mode="horizontal"
      className={styles.wrapper}
      selectedKeys={[location.pathname.split(`/`)[1]]}
    >
      <Menu.Item key="cafes" icon={<EnvironmentOutlined />} />
      <Menu.Item key="cart" icon={<ShoppingCartOutlined />} />
      <Menu.Item key="favourites" icon={<HeartOutlined />} />
      <Menu.Item key="profile" icon={<UserOutlined />} />
    </Menu>
  )
}

export default DockBar
