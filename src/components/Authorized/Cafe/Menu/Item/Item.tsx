import React, { Dispatch, useEffect } from 'react'
import { Form, Modal, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../index'
import { getMenuItem } from '../../../../../reducers/menu'

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

  useEffect(() => {
    if (cafeID && itemID) dispatch(getMenuItem(cafeID, itemID))
  }, [cafeID, dispatch, itemID])

  return (
    <Modal
      title={menuItem?.name}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <p>{menuItem?.available ? `В наличии` : `Нет в наличии`}</p>
      {menuItem?.options.length !== 0 && <h4>Свойства</h4>}
      <Form>
        {menuItem?.options.map((option) => (
          <Form.Item label={option.name}>
            <Select
              defaultValue={option.choices.find((choice) => choice.default)?.id}
            >
              {option.choices.map((choice) => (
                <Select.Option value={choice.id} disabled={!choice.available}>
                  {choice.name}, {choice.price} ₽
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ))}
      </Form>
    </Modal>
  )
}

export default Item
