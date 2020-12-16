import React, { useEffect, useState } from 'react'
import { Drawer, Image, Typography } from 'antd'
import {
  CloseOutlined,
  EnvironmentOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { useParams, useHistory } from 'react-router-dom'
import styles from './cafe.module.scss'
import { useDispatch } from 'react-redux'
import { getCafe } from '../../../reducers/cafe'

interface ParamTypes {
  cafeID: string
}

const Cafe = () => {
  const { cafeID } = useParams<ParamTypes>()

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
      title="Название кофейни"
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
    >
      <Image
        className={styles.image}
        src="https://images.unsplash.com/photo-1482350325005-eda5e677279b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2500&q=80"
      />
      <Typography.Text>
        <EnvironmentOutlined className={styles.icon} /> ул. Садовая, 14
      </Typography.Text>
    </Drawer>
  )
}

export default Cafe
