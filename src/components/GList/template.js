module.exports = {
  // import申明
  import: `import React, { useState } from 'react';
    import { ListView } from 'antd-mobile';
    import { useBoolean } from 'ahooks';`,
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
      // getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
    });`,
  // 变量申明代码
  varCode: ` const [loading, loadingAction] = useBoolean(false);`,
  // 逻辑代码
  logicCode: ``,
  // 组件渲染
  render: `<ListView
    dataSource={dataSource.cloneWithRows(dataSource)}
    renderFooter={() => (
      <div style={{ padding: 30, textAlign: 'center' }}>
        {loading ? 'Loading...' : 'Loaded'}
      </div>
    )}
    renderRow={rowData => <div style={{padding: '30px 10px'}}>666666</div>}
    style={{
      height: '100%',
      overflow: 'auto',
    }}
    pageSize={3}
    onScroll={() => {
      console.log('scroll');
    }}
    scrollRenderAheadDistance={500}
    onEndReached={() => {console.log('onEnd')}}
    onEndReachedThreshold={10}
  />`,
};
