import React  from 'react';
import {Button,Divider} from 'antd';

export default [{
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    align:"center",
    width:"50px"
  }, {
    title: '需求编号',
    dataIndex: 'needId',
    key: 'needId',
    align:"center",
    width:"100px"
  }, {
    title: '需求简称',
    dataIndex: 'needName',
    key: 'needName',
    align:"center",
    width:"200px"
  }, {
    title: '所属项目组',
    dataIndex: 'belongName',
    key: 'belongName',
    align:"center",
    width:"100px"
  }, {
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime',
    align:"center",
    width:"200px"
  }, {
    title: '发预发布时间',
    dataIndex: 'testTime',
    key: 'testTime',
    align:"center",
    width:"200px"
  }, {
    title: '发布时间',
    dataIndex: 'endTime',
    key: 'endTime',
    align:"center",
    width:"200px"
  }, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align:"center",
    width:"200px",
    render:(res,record)=>{
      return(
        <span>
            <Button  size="small">编辑</Button>
            <Divider type="vertical"></Divider>
            <Button type="danger" size="small">删除</Button>
        </span>
        )
    }
  }]