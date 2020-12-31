import React, { Fragment } from 'react'
import { Card, Form, Input, Button, InputNumber, Divider, Switch } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FormListFieldData } from 'antd/es/form/FormList'

interface Props {
  onRemove: (index: number | number[]) => void
  field: FormListFieldData
}

const EditOption = (props: Props) => {
  const { onRemove, field } = props

  return (
    <>
      <Card
        extra={
          <Button danger onClick={() => onRemove(field.name)}>
            Удалить
          </Button>
        }
      >
        <Form.Item
          {...field}
          label="Название опции"
          name={[field.name, `name`]}
          fieldKey={[field.fieldKey, 'name']}
        >
          <Input placeholder="Сироп" size="large" />
        </Form.Item>
        <h4 style={{ marginBottom: 16 }}>Варианты</h4>
        <Form.List name={[field.name, `choices`]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Fragment key={field.key}>
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
                </Fragment>
              ))}
              <Button
                block
                type="dashed"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => add()}
              >
                Добавить вариант
              </Button>
            </>
          )}
        </Form.List>
      </Card>
    </>
  )
}

export default EditOption
