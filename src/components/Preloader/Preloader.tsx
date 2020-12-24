import React from 'react'
import styles from './preloader.module.scss'
import { ReactComponent as WayCoLogo } from './assets/wayco_logo.svg'
import { CSSTransition } from 'react-transition-group'

interface Props {
  visible: boolean
}

const Preloader = (props: Props) => {
  const { visible } = props

  const transitionProps = {
    mountOnEnter: true,
    unmountOnExit: true,
    in: visible,
    timeout: 300,
    classNames: {
      enter: styles.enter,
      enterActive: styles.enterActive,
      exit: styles.exit,
    },
  }

  return (
    <>
      <CSSTransition {...transitionProps}>
        <div className={styles.mask} />
      </CSSTransition>
      <CSSTransition {...transitionProps}>
        <WayCoLogo className={styles.icon} />
      </CSSTransition>
    </>
  )
}

export default Preloader
