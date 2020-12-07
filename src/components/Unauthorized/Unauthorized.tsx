import React from 'react'
import { PageHeader } from 'antd'

interface Props {
  children?: React.ReactNode
}

const Unauthorized = (props: Props) => {
  return (
    <>
      <PageHeader title="Вход" />
      {props.children}
    </>
  )
}

export default Unauthorized
