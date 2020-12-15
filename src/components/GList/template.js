module.exports = {
  // import申明
  import: `import React, { useState, useEffect } from 'react';
  import PropTypes from 'prop-types';
  import {
    unstable_PullToRefresh as PullToRefresh,
    unstable_List as List,
    unstable_Tabs as Tabs,
  } from '@ant-design/mobile';
  import { useRequest } from 'ahooks';
  import { useModel } from 'umi';`,
  // 外部代码
  externalCode: ``,
  // 变量申明代码
  varCode: `const [dataList, setDataList] = useState([]);
  const { config } = useModel('useConfigModel');`,
  // 逻辑代码
  logicCode: `const { loading, run } = useRequest(
    {
      url: '/api/getList',
      method: 'post',
    },
    {
      manual: true,
      onSuccess: res => {
        if (res.code === 0) {
          setDataList([...dataList, ...res.data.list]);
        }
      },
    },
  );

  useEffect(() => {
    run({ currPage: 1, pageSize: 10 });
  }, []);`,
  // 组件渲染
  render: `<>
  {config.showTabs ? (
    <Tabs onChange={() => {}}>
      {[...Array(config.tabNumber).keys()].map((v, i) => (
        <Tabs.Item
          key={i}
          tab={{
            title: '选项卡',
          }}
        ></Tabs.Item>
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
</>`,
  // 外部参数
  propTypes: '',
  HOC: `export default React.memo(GList)`,
}
