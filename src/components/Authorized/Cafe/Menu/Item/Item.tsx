import React, { Dispatch, useEffect } from 'react'
import { Button, Form, InputNumber, Modal, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../index'
import { getMenuItem } from '../../../../../reducers/menu'
import { setProductsCount } from '../../../../../reducers/session'
import { OrderItem } from '../../../../../types'
import addOrderItem from '../../../../../helpers/addOrderItem'
import getOrders from '../../../../../helpers/getOrders'

interface Props {
  cafeID?: number
  itemID?: number
  visible: boolean
  setVisible: Dispatch<boolean>
}

const Item = (props: Props) => {
  const { cafeID, itemID, visible, setVisible } = props
  const { menuItem } = useSelector((state: RootState) => state.menu)

  const dispatch = useDispatch()

  const [form] = Form.useForm()

  useEffect(() => {
    if (cafeID && itemID) dispatch(getMenuItem(cafeID, itemID))
  }, [cafeID, dispatch, itemID])

  const handleSubmit = (values: OrderItem) => {
    const { quantity, ...rest } = values
    if (cafeID && itemID) {
      addOrderItem(cafeID, {
        quantity: quantity,
        product: itemID,
        chosen_options: Object.entries(rest).map(([key, value], index) => ({
          name: key,
          value: {
            id: value,
            name: menuItem?.options
              .find((option) => option.id === index + 1)
              ?.choices.find((choice) => choice.id === value)?.name as string,
          },
        })),
      })
      const orders = getOrders()
      dispatch(setProductsCount(orders.length && orders[0].ordered_products.length))
    }
  }

  return (
    <Modal
      title={menuItem?.name}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button type="primary" key="add" onClick={form.submit}>
          Добавить в корзину
        </Button>,
      ]}
    >
      <p>{menuItem?.available ? `В наличии` : `Нет в наличии`}</p>
      {menuItem?.options.length !== 0 && <h4>Свойства</h4>}
      <Form form={form} onFinish={handleSubmit}>
        {menuItem?.options.map((option) => (
          <Form.Item
            label={option.name}
            name={option.name}
            key={option.id}
            initialValue={option.choices.find((choice) => choice.default)?.id}
          >
            <Select>
              {option.choices.map((choice) => (
                <Select.Option
                  value={choice.id}
                  disabled={!choice.available}
                  key={choice.id}
                >
                  {choice.name}, {choice.price} ₽
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ))}
        <Form.Item label="Количество" name="quantity" initialValue={1}>
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Item
