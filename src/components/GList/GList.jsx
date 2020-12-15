/** @#import#@ import代码块 【模板导入代码块标识，勿删改！】 */
import React, { useState, useEffect } from 'react'
import {
  unstable_PullToRefresh as PullToRefresh,
  unstable_List as List,
  unstable_Tabs as Tabs,
} from '@ant-design/mobile'
import { useRequest } from 'ahooks'
import { useModel } from 'umi'

/** @#externalCode#@ 外部代码 【模板导入代码块标识，勿删改！】 */

const GList = () => {
  /** @#varCode#@ 变量申明代码 【模板导入代码块标识，勿删改！】 */
  const [dataList, setDataList] = useState([])
  const { config } = useModel('useConfigModel')

  /** @#logicCode#@ 内部逻辑代码 【模板导入代码块标识，勿删改！】 */
  const { loading, run } = useRequest(
    {
      url: '/api/getList',
      method: 'post',
    },
    {
      manual: true,
      onSuccess: res => {
        if (res.code === 0) {
          setDataList([...dataList, ...res.data.list])
        }
      },
    },
  )

  useEffect(() => {
    run({ currPage: 1, pageSize: 10 })
  }, [])

  /** @#render#@ 【模板导入代码块标识，勿删改！】 */
  return (
    <>
      {config.showTabs ? (
        <Tabs onChange={() => {}}>
          {[...Array(config.tabNumber).keys()].map(v => (
            <Tabs.Item
              key={v}
              tab={{
                title: '选项卡',
              }}
            />
          ))}
        </Tabs>
      ) : null}
      <List renderHeader="列表头部" renderFooter="列表底部">
        <PullToRefresh
          refreshing={loading}
          direction="up"
          onRefresh={run}
          indicator={{
            deactivate: '上拉加载更多',
            activate: '上拉加载更多',
            release: '加载中',
            finish: '加载完成',
          }}
        >
          {dataList.map(item => (
            <List.Item key={item.id}>{item.text}</List.Item>
          ))}
        </PullToRefresh>
      </List>
    </>
  )
}

/** @#propTypes#@ 【模板导入代码块标识，勿删改！】 */
GList.propTypes = {}

/** @#HOC#@ 高阶组件 【模板导入代码块标识，勿删改！】 */
export default React.memo(GList)
