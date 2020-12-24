import React from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './preloader.module.scss'
import { ReactComponent as WayCoLogo } from './assets/wayco_logo.svg'

const Preloader = () => {
  return (
    <CSSTransition
      in
      appear
      timeout={300}
      classNames={{
        appear: styles.appear,
        enter: styles.enter,
        exit: styles.exit,
        exitDone: styles.exit,
      }}
    >
      <WayCoLogo className={styles.icon} />
    </CSSTransition>
  )
}

export default Preloader
