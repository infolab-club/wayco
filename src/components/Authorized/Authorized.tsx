import React from 'react'
import Map from './Map'

interface Props {
  children?: React.ReactNode
}

const Authorized = (props: Props) => {
  return (
    <>
      <Map />
      {props.children}
    </>
  )
}

export default Authorized
