import React, { useEffect, useState } from 'react'
import { Button, Drawer, Rate, Typography } from 'antd'
import {
  CloseOutlined,
  EnvironmentOutlined,
  VerticalAlignTopOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { useParams, useHistory } from 'react-router-dom'
import styles from './cafe.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCafe } from '../../../reducers/cafe'
import { RootState } from '../../../index'

interface ParamTypes {
  cafeID: string
}

const Cafe = () => {
  const { cafeID } = useParams<ParamTypes>()
  const { cafe } = useSelector((state: RootState) => state.cafe)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getCafe(parseInt(cafeID)))
  }, [dispatch, cafeID])

  const [showDrawer, setShowDrawer] = useState(true)
  const [fullscreenDrawer, setFullscreenDrawer] = useState(false)

  const handleSetFullscreen = (evt: React.MouseEvent) => {
    evt.stopPropagation()
    setFullscreenDrawer(true)
  }

  const handleDrawerClose = () => {
    setShowDrawer(false)
    history.push(`/cafes`)
  }

  return (
    <Drawer
      title={cafe?.name}
      placement="bottom"
      className={fullscreenDrawer ? styles.fullscreenDrawer : styles.drawer}
      closable={true}
      closeIcon={
        fullscreenDrawer ? (
          <CloseOutlined onClick={handleDrawerClose} />
        ) : (
          <VerticalAlignTopOutlined onClick={handleSetFullscreen} />
        )
      }
      onClose={handleDrawerClose}
      visible={showDrawer}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      {/*<Image className={styles.image} src="error" fallback="No image" />*/}
      <div className={styles.dataWrapper}>
        <Rate allowHalf value={cafe?.average_rating} />
        <Typography.Text>
          <EnvironmentOutlined className={styles.icon} /> {cafe?.address}
        </Typography.Text>
        <Typography.Text>
          <FileTextOutlined className={styles.icon} /> {cafe?.description}
        </Typography.Text>
        <Button size="large">Сделать заказ</Button>
      </div>
    </Drawer>
  )
}

export default Cafe
