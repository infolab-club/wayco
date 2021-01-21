import React, { useEffect } from 'react'
import { Button, Card, PageHeader } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './order.module.scss'
import { getCafe } from 'reducers/cafe'
import { RootState } from 'index'
import getOrders from 'helpers/getOrders'
import { getMenu } from 'reducers/menu'
import { postOrder } from 'reducers/orders'
import { setProductsCount } from 'reducers/session'

interface ParamTypes {
  cafeID: string
}

const Order = () => {
  const { cafeID } = useParams<ParamTypes>()
  const { cafe } = useSelector((state: RootState) => state.cafe)
  const { menu } = useSelector((state: RootState) => state.menu)

  const dispatch = useDispatch()
  const history = useHistory()
  const orders = getOrders()

  useEffect(() => {
    dispatch(getCafe(parseInt(cafeID)))
    dispatch(getMenu(parseInt(cafeID)))
  }, [cafeID, dispatch])

  const handleOrder = async () => {
    // @ts-ignore
    const { data } = await dispatch(
      postOrder({
        cafe: cafeID,
        ordered_products: orders[0].ordered_products.map((product) => ({
          ...product,
          chosen_options: product.chosen_options.map(
            (option) => option.value.id,
          ),
        })),
      }),
    )
    sessionStorage.clear()
    dispatch(setProductsCount(0))
    history.push(`/cart/success/${data.order_num}`)
  }

  return (
    <>
      <PageHeader title={cafe?.name} onBack={() => history.push(`/cart`)} />
      <div className={styles.wrapper}>
        {orders
          .find((order) => order.cafe === parseInt(cafeID))
          ?.ordered_products.map((product) => (
            <Card key={product.product}>
              <h4>{menu?.find((item) => item.id === product.product)?.name}</h4>
              {product.chosen_options.map((option) => (
                <p>
                  {option.name}: {option.value.name}
                </p>
              ))}
            </Card>
          ))}
        <Button block type="primary" size="large" onClick={handleOrder}>
          Сделать заказ
        </Button>
      </div>
    </>
  )
}

export default Order
