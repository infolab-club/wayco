import React from 'react'
import { Image, Typography } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import styles from './cafe.module.scss'
import Icon from 'antd/es/icon'

const Cafe = () => {
  return (
    <>
      <Image
        className={styles.image}
        src="https://images.unsplash.com/photo-1482350325005-eda5e677279b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2500&q=80"
      />
      <Typography.Text>
        <EnvironmentOutlined className={styles.icon} /> ул. Садовая, 14
      </Typography.Text>
    </>
  )
}

export default Cafe
