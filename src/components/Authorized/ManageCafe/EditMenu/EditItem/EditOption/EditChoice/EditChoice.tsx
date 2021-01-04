import React  from 'react'
import { Button, Divider, Form, Input, InputNumber, Switch } from 'antd'
import { FormListFieldData } from 'antd/lib/form/FormList'

interface Props {
  field: FormListFieldData
  remove: (index: number | number[]) => void
}

const EditChoice = (props: Props) => {
  const { field, remove } = props

  return (
    <>
      <Form.Item
        {...field}
        label="Название"
        name={[field.name, `name`]}
        fieldKey={[field.fieldKey, 'name']}
        key="name"
      >
        <Input placeholder="Клубничный" />
      </Form.Item>
      <Form.Item
        {...field}
        label="Цена"
        name={[field.name, `price`]}
        fieldKey={[field.fieldKey, 'price']}
        key="price"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        {...field}
        label="По умолчанию"
        name={[field.name, `default`]}
        fieldKey={[field.fieldKey, 'default']}
        key="default"
        valuePropName="checked"
      >
        <Switch defaultChecked={false} />
      </Form.Item>
      <Form.Item
        {...field}
        label="В наличии"
        name={[field.name, `available`]}
        fieldKey={[field.fieldKey, 'available']}
        key="available"
        valuePropName="checked"
      >
        <Switch defaultChecked={false} />
      </Form.Item>
      <Button danger onClick={() => remove(field.name)}>
        Убрать вариант
      </Button>
      <Divider />
    </>
  )
}

export default EditChoice
