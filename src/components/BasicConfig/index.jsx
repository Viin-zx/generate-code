import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { useModel } from 'umi'

const initialValues = {
  exportFileName: 'BaseTemplate',
}

function Config() {
  const { setBasicConfig } = useModel('useConfigModel')

  useEffect(() => {
    setBasicConfig(initialValues)
  }, [])

  return (
    <Form
      name="component-config"
      initialValues={initialValues}
      onValuesChange={(changedValues, allValues) => {
        setBasicConfig(allValues)
      }}
    >
      <Form.Item name="exportFileName" label="生成文件名称">
        <Input />
      </Form.Item>
    </Form>
  )
}

Config.propTypes = {}

export default React.memo(Config)
