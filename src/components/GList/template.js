module.exports = {
  // import申明
  import: `import React, { useEffect, useCallback } from 'react';
  import { ListView } from 'antd-mobile';
  import { useSetState } from 'ahooks';
  import styles from './style.less';`,
  // 外部代码
  externalCode: `
  const data = [
    {
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      title: '你是猪',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '你是狗',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      title: '你是猫',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
  ];
  
  const dataSource = new ListView.DataSource({
    data,
    rowHasChanged: (row1, row2) => row1 !== row2,
  });
  
  const renderRow = (rowData, s1, index) => {
    // 自定义每行的内容
    return (
      <div className={styles['row']} onClick={() => {}}>
        {rowData.title}+{index}
      </div>
    );
  };`,
  // 变量申明代码
  varCode: `// 列表状态
  const [state, setState] = useSetState({
    list: [...data, ...data, ...data],
    currPage: 0,
    pageSize: 3,
    totalPage: 0,
    loading: false,
  });`,
  // 逻辑代码
  logicCode: `// 获取列表数据
  const getData = useCallback(() => {
    if (state.loading) {
      return;
    }

    setState({ loading: true });
    // 请求数据接口
    new Promise(resolve => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: {
            currPage: state.currPage + 1,
            list: data,
            pageSize: state.pageSize,
            totalPage: state.currPage + 2,
          },
          msg: 'TradeOK',
        });
      }, 1000);
    }).then(res => {
      if (res.code === 0) {
        setState({
          ...res.data,
          list: [...state.list, ...res.data.list],
          loading: false,
        });
      }
    });
  }, [state]);

  useEffect(() => {
    getData();
  }, []);`,
  // 组件渲染
  render: `<ListView
  dataSource={dataSource.cloneWithRows(state.list)}
  renderRow={renderRow}
  renderFooter={() => (
    <div style={{ padding: 10, textAlign: 'center' }}>
      {state.loading ? 'Loading...' : 'Loaded'}
    </div>
  )}
  style={{
    height: '100%',
    overflow: 'auto',
  }}
  pageSize={state.pageSize}
  onScroll={() => {}}
  scrollRenderAheadDistance={500}
  onEndReached={() => {
    if (state.currPage < state.totalPage) {
      getData();
    }
  }}
  onEndReachedThreshold={10}
/>`,
  // 外部参数
  propTypes: '',
};
