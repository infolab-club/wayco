import React from 'react'
import styles from './authorized.module.scss'
import DockBar from './DockBar/DockBar'

interface Props {
  children?: React.ReactNode
}

const Authorized = (props: Props) => {
  return (
    <>
      <div className={styles.content}>
        {props.children}
      </div>
      <div className={styles.dockBar}>
        <DockBar />
      </div>
    </>
  )
}

export default Authorized
