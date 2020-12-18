import React from 'react'
import { Menu } from 'antd'
import {
  EnvironmentOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import styles from './dockBar.module.scss'
import { useHistory } from 'react-router-dom'

const DockBar = () => {
  const history = useHistory()

  return (
    <Menu
      mode="horizontal"
      className={styles.wrapper}
      selectedKeys={[history.location.pathname.split(`/`)[1]]}
      onClick={({ key }) => history.push(`/${key}`)}
    >
      <Menu.Item key="cafes" icon={<EnvironmentOutlined />} />
      <Menu.Item key="cart" icon={<ShoppingCartOutlined />} />
      <Menu.Item key="favourites" icon={<HeartOutlined />} />
      <Menu.Item key="profile" icon={<UserOutlined />} />
    </Menu>
  )
}

export default DockBar
