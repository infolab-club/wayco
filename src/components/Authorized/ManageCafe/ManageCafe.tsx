import React from 'react'
import { PageHeader } from 'antd'
import { useHistory } from 'react-router-dom'
import styles from './manageCafe.module.scss'
import EditInfo from './EditInfo/EditInfo'
import EditMenu from './EditMenu/EditMenu'

const ManageCafe = () => {
  const history = useHistory()

  return (
    <>
      <PageHeader
        title="Управление кофейней"
        onBack={() => history.push(`/cafe`)}
      />
      <div className={styles.wrapper}>
        <h4>Информация</h4>
        <EditInfo />
        <h4>Меню</h4>
        <EditMenu />
      </div>
    </>
  )
}

export default ManageCafe
