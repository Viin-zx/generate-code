import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TabBar } from 'antd-mobile';

const GTabBar = () => {
  const [items, setItems] = useState([{ title: '主页' }]);

  useEffect(() => {}, []);

  return (
    <TabBar>
      {items.map(item => (
        <TabBar.Item
          title="Life"
          key="Life"
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selected={this.state.selectedTab === 'blueTab'}
          badge={1}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}
          data-seed="logId"
        >
          {this.renderContent('Life')}
        </TabBar.Item>
      ))}
    </TabBar>
  );
};

GTabBar.propTypes = {};

export default GTabBar;
