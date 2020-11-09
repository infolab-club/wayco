import React from 'react'
import { CoffeeOutlined } from '@ant-design/icons'
import styles from './marker.module.scss'

interface Props {
  lat: number
  lng: number
  type: 'cafe' | 'user'
  onClick?: () => void
}

const Marker = (props: Props) => {
  const { onClick, type } = props

  if (type === `user`) return <span className={styles.user} />

  return (
    <span className={styles.wrapper} onClick={onClick}>
      <CoffeeOutlined />
    </span>
  )
}

export default Marker
