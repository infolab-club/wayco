import React from 'react'
import { Menu } from 'antd'
import {
  EnvironmentOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import styles from './dockBar.module.scss'

const DockBar = () => {
  return (
    <Menu mode="horizontal" className={styles.wrapper}>
      <Menu.Item key="map" icon={<EnvironmentOutlined />} />
      <Menu.Item key="cart" icon={<ShoppingCartOutlined />} />
      <Menu.Item key="favourites" icon={<HeartOutlined />} />
      <Menu.Item key="profile" icon={<UserOutlined />} />
    </Menu>
  )
}

export default DockBar
