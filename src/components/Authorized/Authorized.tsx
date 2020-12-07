import React, { useState } from 'react'
import { Drawer } from 'antd'
import { VerticalAlignTopOutlined, CloseOutlined } from '@ant-design/icons'
import styles from './authorized.module.scss'
import Map from './Map'
import Cafe from './Cafe'

interface Props {
  children?: React.ReactNode
}

const Authorized = (props: Props) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [fullscreenDrawer, setFullscreenDrawer] = useState(false)

  const handleSetFullscreen = (evt: React.MouseEvent) => {
    evt.stopPropagation()
    setFullscreenDrawer(true)
  }

  const handleDrawerClose = () => {
    setShowDrawer(false)
  }

  const handleDrawerOpen = () => {
    setFullscreenDrawer(false)
    setShowDrawer(true)
  }

  return (
    <>
      {props.children}
      <Map onMarkerClick={handleDrawerOpen} />
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
        <Cafe />
      </Drawer>
    </>
  )
}

export default Authorized
