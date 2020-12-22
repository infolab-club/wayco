import React, { useEffect, useState } from 'react'
import { Drawer } from 'antd'
import { CloseOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import { useParams, useHistory } from 'react-router-dom'
import styles from './cafe.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCafe, setCafe } from '../../../reducers/cafe'
import { RootState } from '../../../index'
import Info from './Info/Info'
import Menu from './Menu/Menu'
import Map from './Map'

interface ParamTypes {
  cafeID: string
}

const Cafe = () => {
  const { cafeID } = useParams<ParamTypes>()
  const { cafe } = useSelector((state: RootState) => state.cafe)

  const dispatch = useDispatch()
  const history = useHistory()

  const [fullscreenDrawer, setFullscreenDrawer] = useState(false)

  useEffect(() => {
    if (cafeID) dispatch(getCafe(parseInt(cafeID)))
    else {
      dispatch(setCafe(undefined))
      setFullscreenDrawer(false)
    }
  }, [dispatch, cafeID])

  const handleSetFullscreen = (evt: React.MouseEvent) => {
    evt.stopPropagation()
    setFullscreenDrawer(true)
  }

  const handleDrawerClose = () => {
    dispatch(setCafe(undefined))
    history.push(`/cafes`)
  }

  return (
    <div className={styles.wrapper}>
      <Map />
      <Drawer
        title={cafe?.name || ` `}
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
        visible={!!cafe}
        getContainer={false}
      >
        {/*<Image className={styles.image} src="error" fallback="No image" />*/}
        <h3 className={styles.title}>Инфо</h3>
        <Info />
        <h3 className={styles.title}>Меню</h3>
        <Menu />
      </Drawer>
    </div>
  )
}

export default Cafe
