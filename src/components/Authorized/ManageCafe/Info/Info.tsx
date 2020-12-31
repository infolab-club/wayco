import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../index'
import { getCafe, putCafe } from '../../../../reducers/cafe'
import { Button, Form, Input, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const Info = () => {
  const { cafeID } = useSelector((state: RootState) => state.session)
  const { cafe } = useSelector((state: RootState) => state.cafe)

  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (cafeID) dispatch(getCafe(cafeID))
  }, [cafeID, dispatch])

  useEffect(() => {
    if (cafe) form.resetFields()
  }, [cafe, form])

  const handleSubmit = async (values: unknown) => {
    setLoading(true)
    try {
      if (cafeID) await dispatch(putCafe(cafeID, values))
    } catch {}
    setLoading(false)
  }

  return (
    <Form initialValues={cafe} form={form} onFinish={handleSubmit}>
      <Form.Item label="Название" name="name">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Широта" name="latitude">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Долгота" name="longitude">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Адрес" name="address">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Фотографии" name="photos" valuePropName="fileList">
        <Upload>
          <Button disabled size="large" icon={<UploadOutlined />}>
            Добавить фотографии
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Описание" name="description">
        <Input.TextArea rows={5} size="large" />
      </Form.Item>
      <Button
        block
        type="primary"
        size="large"
        loading={loading}
        onClick={form.submit}
      >
        Сохранить
      </Button>
    </Form>
  )
}

export default Info
