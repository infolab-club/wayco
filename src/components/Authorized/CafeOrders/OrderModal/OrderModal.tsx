import React, { Dispatch, useEffect } from 'react'
import { Button, Form, Modal, Select } from 'antd'
import { HistoryOrder } from '../../../../types'
import { useDispatch } from 'react-redux'
import { patchOrder } from '../../../../reducers/orders'
import { getActiveOrders, getFinishedOrders } from '../../../../reducers/cafe'

interface Props {
  visible: boolean
  setVisible: Dispatch<boolean>
  order?: HistoryOrder
}

const OrderModal = (props: Props) => {
  const { visible, setVisible, order } = props

  const dispatch = useDispatch()

  const [form] = Form.useForm()

  useEffect(() => {
    if (order) form.resetFields()
  }, [form, order])

  const handleSubmit = async (values: unknown) => {
    await dispatch(patchOrder(order?.id as number, values))
    dispatch(getActiveOrders())
    dispatch(getFinishedOrders())
  }

  return (
    <Modal
      title={`Заказ ${order?.order_num}`}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setVisible(false)}>
          Отмена
        </Button>,
        <Button key="save" type="primary" onClick={form.submit}>
          Сохранить
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          initialValue={order?.status}
          name="status"
          label="Статус заказа"
        >
          <Select placeholder="Выберите статус заказа" size="large">
            <Select.Option disabled value="active">
              Активен
            </Select.Option>
            <Select.Option value="ready">Готов</Select.Option>
            <Select.Option value="claimed">Отдан</Select.Option>
            <Select.Option value="unclaimed">Не отдан</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default OrderModal
