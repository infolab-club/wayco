import React, { Dispatch, useEffect } from 'react'
import { Button, Divider, Form, Input, InputNumber, Modal, Switch } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'index'
import {
  deleteMenuItem,
  getMenu,
  getMenuItem,
  postMenuItem,
  putMenuItem,
} from 'reducers/menu'
import EditOption from './EditOption/EditOption'
import styles from './editItem.module.scss'

interface Props {
  cafeID?: number
  itemID?: number
  visible: boolean
  setVisible: Dispatch<boolean>
  modalMode: 'adding' | 'editing'
}

const EditItem = (props: Props) => {
  const { cafeID, itemID, visible, setVisible, modalMode } = props
  const { menuItem } = useSelector((state: RootState) => state.menu)

  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (cafeID && itemID) dispatch(getMenuItem(cafeID, itemID))
  }, [cafeID, dispatch, itemID])

  useEffect(() => {
    if (menuItem || !visible || modalMode) form.resetFields()
  }, [form, menuItem, modalMode, visible])

  const handleSubmit = async (values: unknown) => {
    if (!cafeID) return
    if (modalMode === `editing` && itemID)
      await dispatch(putMenuItem(cafeID, itemID, values))
    if (modalMode === `adding`) await dispatch(postMenuItem(cafeID, values))
    await dispatch(getMenu(cafeID))
    setVisible(false)
  }

  const handleDelete = async () => {
    if (cafeID && itemID) {
      await dispatch(deleteMenuItem(cafeID, itemID))
      await dispatch(getMenu(cafeID))
      setVisible(false)
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
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={modalMode === `editing` ? menuItem : undefined}
      >
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
      {modalMode !== `adding` && (
        <>
          <Divider />
          <Button block danger size="large" onClick={handleDelete}>
            Удалить продукт
          </Button>
        </>
      )}
    </Modal>
  )
}

export default EditItem
