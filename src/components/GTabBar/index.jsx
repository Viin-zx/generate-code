import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { unstable_TabBar as TabBar } from '@ant-design/mobile'
import { Home } from '@ant-design/mobile-icons'
import styles from './style.less'

const items = [
  {
    key: 'home',
    icon: <Home />,
    activeIcon: <Home />,
    title: '主页',
    renderContent: <div>我是主页啊</div>,
  },
  {
    key: 'home1',
    icon: <Home />,
    activeIcon: <Home />,
    title: '主页',
    renderContent: <div>我是主页啊1</div>,
  },
  {
    key: 'home2',
    icon: <Home />,
    activeIcon: <Home />,
    title: '主页',
    renderContent: <div>我是主页啊2</div>,
  },
]

const GTabBar = () => {
  const [activeKey, setActiveKey] = useState('home')

  return (
    <div className={styles['tabbar']}>
      <TabBar>
        {items.map(({ key, renderContent, ...item }) => (
          <TabBar.Item
            {...item}
            key={key}
            activeClassName="active-tab"
            active={activeKey === key}
            onPress={() => {
              setActiveKey(key)
            }}
          >
            {renderContent}
          </TabBar.Item>
        ))}
      </TabBar>
    </div>
  )
}

GTabBar.propTypes = {}

export default GTabBar
