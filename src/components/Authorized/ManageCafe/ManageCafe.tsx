import React from 'react'
import { PageHeader } from 'antd'
import { useHistory } from 'react-router-dom'

const ManageCafe = () => {
  const history = useHistory()

  return (
    <PageHeader
      title="Управление кофейней"
      onBack={() => history.push(`/cafe`)}
    />
  )
}

export default ManageCafe
