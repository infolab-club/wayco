import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'index'
import { getMenu } from 'reducers/menu'
import { Button, Card } from 'antd'
import EditItem from './EditItem/EditItem'
import { PlusOutlined } from '@ant-design/icons'

const EditMenu = () => {
  const { cafe } = useSelector((state: RootState) => state.cafe)
  const { menu } = useSelector((state: RootState) => state.menu)

  const dispatch = useDispatch()

  const [modalVisible, setModalVisible] = useState(false)
  const [itemID, setItemID] = useState<number>()
  const [modalMode, setModalMode] = useState<'adding' | 'editing'>('editing')

  useEffect(() => {
    if (cafe) dispatch(getMenu(cafe.id))
  }, [cafe, dispatch])

  const handleItemClick = (id: number) => {
    setModalMode(`editing`)
    setItemID(id)
    setModalVisible(true)
  }

  const handleAddItemClick = () => {
    setModalMode(`adding`)
    setModalVisible(true)
  }

  return (
    <>
      <EditItem
        itemID={itemID}
        cafeID={cafe?.id}
        visible={modalVisible}
        setVisible={setModalVisible}
        modalMode={modalMode}
      />
      {menu?.map((item) => (
        <Card key={item.id} onClick={() => handleItemClick(item.id)}>
          <h4>
            {item.name}, {parseInt(item.price)} ₽
          </h4>
          <p>{item.available ? `В наличии` : `Нет в наличии`}</p>
          <p>
            {item.has_options ? `Содержит варианты` : `Не содержит вариантов`}
          </p>
        </Card>
      ))}
      <Button
        type="dashed"
        size="large"
        icon={<PlusOutlined />}
        onClick={handleAddItemClick}
      >
        Добавить продукт
      </Button>
    </>
  )
}

export default EditMenu
