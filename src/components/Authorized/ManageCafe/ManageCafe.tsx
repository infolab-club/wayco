import React from 'react'
import { PageHeader } from 'antd'
import { useHistory } from 'react-router-dom'
import styles from './manageCafe.module.scss'
import Info from './Info/Info'

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
        <Info />
        <h4>Меню</h4>
      </div>
    </>
  )
}

export default ManageCafe
