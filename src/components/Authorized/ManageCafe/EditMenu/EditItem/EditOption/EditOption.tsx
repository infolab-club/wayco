import React  from 'react'
import { Card, Form, Input, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FormListFieldData } from 'antd/es/form/FormList'
import EditChoice from './EditChoice/EditChoice'

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
              {fields.length ? (
                fields.map((field) => (
                  <EditChoice field={field} remove={remove} key={field.key} />
                ))
              ) : (
                <EditChoice field={field} remove={remove} />
              )}
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
