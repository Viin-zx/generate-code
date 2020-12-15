import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'
import { useRequest } from 'ahooks'
import { Row, Col, Button, Card } from 'antd'
import { GList, BasicConfig } from '@/components'
import GTabBar from '@/components/GTabBar'
import Dragula from 'react-dragula'

const componentList = [
  {
    name: 'GList',
    Component: GList.Component,
    Config: GList.Config,
  },
]

export default () => {
  const [currComp, setCurrComp] = useState(componentList[0])

  const { data, loading, run } = useRequest(
    {
      url: '/api/generate',
      method: 'post',
    },
    { manual: true },
  )

  const AppComponent = currComp.Component
  const ConfigComponent = currComp.Config

  return (
    <Row className={styles['container']}>
      <Col lg={6} xs={0} className={styles['container-left']}>
        <Row gutter={16}>
          {componentList.map(item => (
            <Col
              key={item.name}
              span={12}
              style={{ marginBottom: 16 }}
              onClick={() => {
                setCurrComp(item)
              }}
            >
              <Card hoverable>{item.name}</Card>
            </Col>
          ))}
        </Row>
      </Col>
      <Col lg={12} xs={24} className={styles['container-main']}>
        <div className={styles['container-app']}>
          <AppComponent />
        </div>
      </Col>
      <Col lg={6} xs={0} className={styles['container-right']}>
        <BasicConfig />
        <ConfigComponent />
        <Button onClick={run} loading={loading}>
          生成
        </Button>
      </Col>
    </Row>
  )
}
