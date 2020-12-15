import React, { useEffect } from 'react'
import { Form, InputNumber, Switch } from 'antd'
import { useModel } from 'umi'

const initialValues = {
  showTabs: true,
  tabNumber: 2,
}

function Config() {
  const { config, setConfig } = useModel('useConfigModel')

  useEffect(() => {
    setConfig(initialValues)
  }, [])

  return (
    <Form
      name="component-config"
      initialValues={initialValues}
      onValuesChange={(changedValues, allValues) => {
        setConfig(allValues)
      }}
    >
      <Form.Item
        name="showTabs"
        label="是否启用tabs切换列表"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      {config.showTabs ? (
        <Form.Item name="tabNumber" label="tab数量">
          <InputNumber min={2} />
        </Form.Item>
      ) : null}
    </Form>
  )
}

Config.propTypes = {}

export default React.memo(Config)
