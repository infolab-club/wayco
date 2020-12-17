import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import styles from './menu.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../index'
import { getMenu } from '../../../../reducers/menu'
import Item from './Item/Item'

const Menu = () => {
  const { cafe } = useSelector((state: RootState) => state.cafe)
  const { menu } = useSelector((state: RootState) => state.menu)

  const dispatch = useDispatch()

  const [modalVisible, setModalVisible] = useState(false)
  const [itemID, setItemID] = useState<number>()

  useEffect(() => {
    if (cafe) dispatch(getMenu(cafe.id))
  }, [cafe, dispatch])

  const handleItemClick = (id: number) => {
    setItemID(id)
    setModalVisible(true)
  }

  return (
    <div className={styles.wrapper}>
      <Item
        itemID={itemID}
        cafeID={cafe?.id}
        visible={modalVisible}
        setVisible={setModalVisible}
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
    </div>
  )
}

export default Menu
