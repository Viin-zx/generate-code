import React from 'react';
import styles from './index.less';
import { useRequest } from 'ahooks';
import { Row, Col, Button } from 'antd';

export default () => {
  const { data, loading, run } = useRequest(
    {
      url: '/api/generate',
      method: 'post',
    },
    { manual: true },
  );

  return (
    <Row className={styles['container']}>
      <Col span={6} className={styles['container-left']}>
        <Button onClick={run} loading={loading}>
          生成
        </Button>
      </Col>
      <Col span={12} className={styles['container-main']}>
        <div className={styles['container-app']}></div>
      </Col>
      <Col span={6} className={styles['container-right']}></Col>
    </Row>
  );
};
