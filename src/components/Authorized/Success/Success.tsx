import React from 'react'
import { PageHeader, Result } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { CheckCircleOutlined } from '@ant-design/icons'

interface ParamTypes {
  code: string
}

const Success = () => {
  const { code } = useParams<ParamTypes>()

  const history = useHistory()

  return (
    <>
      <PageHeader title="Успех" onBack={() => history.push(`/cart`)} />
      <Result
        icon={<CheckCircleOutlined />}
        title={`Номер заказа: ${code}`}
        subTitle="Ваш заказ принят!"
      />
    </>
  )
}

export default Success
