import React from 'react'
import styles from './authorized.module.scss'
import Map from './Map'
import DockBar from './DockBar/DockBar'

interface Props {
  children?: React.ReactNode
}

const Authorized = (props: Props) => {
  return (
    <>
      <div className={styles.content}>
        <Map />
        {props.children}
      </div>
      <div className={styles.dockBar}>
        <DockBar />
      </div>
    </>
  )
}

export default Authorized
