import React, { useState } from 'react'
import { Drawer } from 'antd'
import Map from './Map'

const Authorized = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  return (
    <>
      <Map onMarkerClick={() => setShowDrawer(true)} />
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={true}
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}
      />
    </>
  )
}

export default Authorized
