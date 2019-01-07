import React  from 'react';
import {Button,Divider,Popconfirm} from 'antd';
import {requestApi} from "../../config";
const delData=(id)=>{
    fetch(`${requestApi}/api/BackGround/DelPlan?id=`+id).then(res=>{res.json()}).then(res=>{console.log(res)})
}

export default [{
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    align:"center",
    width:"50px"
  }, {
    title: '需求编号',
    dataIndex: 'requertNo',
    key: 'requertNo',
    align:"center",
    width:"100px"
  },{
    title: '需求优先级',
    dataIndex: 'priority',
    key: 'priority',
    align:"center",
    width:"60px"
  }, {
    title: '需求简称',
    dataIndex: 'requestName',
    key: 'requestName',
    align:"center",
    width:"200px"
  }, {
    title: '所属项目组',
    dataIndex: 'mainGroup',
    key: 'mainGroup',
    align:"center",
    width:"100px"
  }, {
    title: '开始时间',
    dataIndex: 'beginTime',
    key: 'beginTime',
    align:"center",
    width:"200px"
  }, {
    title: '发预发布时间',
    dataIndex: 'preReleaseTime',
    key: 'preReleaseTime',
    align:"center",
    width:"200px"
  }, {
    title: '发布时间',
    dataIndex: 'releaseTime',
    key: 'releaseTime',
    align:"center",
    width:"200px"
  }, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align:"center",
    width:"200px",
    render:(res,record)=>{
      console.log(record.id)
      return(
        <span>
          <Popconfirm >
              <Button  size="small" >编辑</Button>
          </Popconfirm>
            <Divider type="vertical"></Divider>
          <Popconfirm onConfirm={()=>{delData(record.id)}} okText="确定" cancelText="取消" title="是否删除该需求？">
            <Button type="danger" size="small" >删除</Button>
          </Popconfirm>
            <Divider type="vertical"></Divider>
          <Popconfirm onConfirm={()=>{alert("是否关闭？")}} okText="确定" cancelText="取消" title="是否关闭该需求？">
            <Button type="danger" size="small" >关闭</Button>
          </Popconfirm>
            
        </span>
        )
    }
  }]