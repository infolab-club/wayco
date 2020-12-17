import React  from 'react'
import { Rate, Typography } from 'antd'
import { EnvironmentOutlined, FileTextOutlined } from '@ant-design/icons'
import styles from '../cafe.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../index'

const Info = () => {
  const { cafe } = useSelector((state: RootState) => state.cafe)

  return (
    <div className={styles.dataWrapper}>
      <Rate allowHalf value={cafe?.average_rating} />
      <Typography.Text>
        <EnvironmentOutlined className={styles.icon} /> {cafe?.address}
      </Typography.Text>
      <Typography.Text>
        <FileTextOutlined className={styles.icon} /> {cafe?.description}
      </Typography.Text>
    </div>
  )
}

export default Info
