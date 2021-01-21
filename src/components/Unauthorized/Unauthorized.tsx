import React from 'react'
import { PageHeader } from 'antd'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from 'index'

interface Props {
  children?: React.ReactNode
}

const Unauthorized = (props: Props) => {
  const { title, previousPage } = useSelector(
    (state: RootState) => state.header,
  )

  const history = useHistory()

  return (
    <>
      <PageHeader
        title={title}
        onBack={previousPage ? () => history.push(previousPage) : undefined}
      />
      {props.children}
    </>
  )
}

export default Unauthorized
