import React, { Dispatch, useEffect } from 'react'
import { Button, Form, Input, InputNumber, Modal, Switch } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../index'
import { getMenu, getMenuItem, putMenuItem } from '../../../../../reducers/menu'
import { OrderItem } from '../../../../../types'
import EditOption from './EditOption/EditOption'
import styles from './editItem.module.scss'

interface Props {
  cafeID?: number
  itemID?: number
  visible: boolean
  setVisible: Dispatch<boolean>
}

const EditItem = (props: Props) => {
  const { cafeID, itemID, visible, setVisible } = props
  const { menuItem } = useSelector((state: RootState) => state.menu)

  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (cafeID && itemID) dispatch(getMenuItem(cafeID, itemID))
  }, [cafeID, dispatch, itemID])

  useEffect(() => {
    if (menuItem) form.resetFields()
    if (!visible) form.resetFields()
  }, [form, menuItem, visible])

  const handleSubmit = async (values: OrderItem) => {
    if (cafeID && itemID) {
      await dispatch(putMenuItem(cafeID, itemID, values))
      dispatch(getMenu(cafeID))
    }
  }

  return (
    <Modal
      title={menuItem?.name}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button type="primary" key="add" size="large" onClick={form.submit}>
          Сохранить
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleSubmit} initialValues={menuItem}>
        <Form.Item label="Название" name="name">
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Цена" name="price">
          <InputNumber size="large" />
        </Form.Item>
        <Form.Item label="Изображение" name="image_src">
          <Input disabled size="large" />
        </Form.Item>
        <Form.Item label="В наличии" name="available" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div className={styles.optionsWrapper}>
          <h4>Опции</h4>
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <EditOption field={field} key={field.key} onRemove={remove} />
                ))}
                <Button
                  block
                  type="dashed"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={() => add()}
                >
                  Добавить опцию
                </Button>
              </>
            )}
          </Form.List>
        </div>
      </Form>
    </Modal>
  )
}

export default EditItem
