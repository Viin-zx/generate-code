import React, { useState } from 'react';
import { List } from 'antd-mobile';
const api = {};

const { Item } = List;


interface IProps  {
  value: string,
}

const GList = (props: IProps) => {
  

  return (
    <List renderHeader={() => 'Basic Style'} className="my-list">
      {dataList.map(item => (
        `<div> </div>`
      ))}
    </List>
  );
};

cosnt data =({confgi , data})=>{
  useEffect(() => {
    effect
    return () => {
      cleanup
    }
  }, [input])

  return <GList data={data}/>
}

// GList.template = props =>
//   `<GList onClick=${props.onClick} dataSource={data}></GList>`;

export default GList;
