import React, { PureComponent, Fragment } from 'react';
import { Table ,Button,Divider,Popconfirm} from 'antd';
import EditComponent from "../EditDialog";
import {connect} from "react-redux";
import {
    CloseEdit,
    OpenEdit,
    GetData,
    DelData,
    EditData,
    CloseData
} from "../../store/actionsCreator";

class TableComponent extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            editData:{},
            columns:[{
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                align:"center",
                width:"50px",
                defaultSortOrder:"ascend",
                sorter: (a, b) => a.id - b.id,
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
                title: '需求状态',
                dataIndex: 'status',
                key: 'status',
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
                title: '配合组',
                dataIndex: 'matchingGroup',
                key: 'matchingGroup',
                align:"center",
                width:"200px",
                render:(res,record)=>{
                  if(res===""){
                    return "";
                  }else{
                    let newRes = res.map((item,index)=>{
                      if(item=="1"){
                          return "kede"
                      }
                      if(item=="2"){
                          return "百秀"
                      }
                      if(item=="3"){
                          return "业务平台"
                      }
                      if(item=="4"){
                          return "技术平台"
                      }
                      if(item=="5"){
                          return "后台"
                      }
                      if(item=="6"){
                          return "erp"
                      }

                  })
                    let str = newRes.map((item)=>{
                      return item+" ";
                    })
                    return str
                  }
                }
              },{
                title: '开始时间',
                dataIndex: 'beginTime',
                key: 'beginTime',
                align:"center",
                width:"150px"
              }, {
                title: '发预发布时间',
                dataIndex: 'preReleaseTime',
                key: 'preReleaseTime',
                align:"center",
                width:"150px"
              }, {
                title: '发布时间',
                dataIndex: 'releaseTime',
                key: 'releaseTime',
                align:"center",
                width:"150px"
              }, {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align:"center",
                width:"200px",
                render:(res,record)=>{
                  return(
                    <span>
                        <Button  size="small" onClick={()=>{this.props.onEditData(record.id)}}>编辑</Button>
                        <Divider type="vertical"></Divider>
                      <Popconfirm onConfirm={()=>{this.props.onDelData(record.id)}} okText="确定" cancelText="取消" title="是否删除该需求？">
                        <Button type="danger" size="small" >删除</Button>
                      </Popconfirm>
                        <Divider type="vertical"></Divider>
                      <Popconfirm onConfirm={()=>{this.props.onCloseData(record.id)}} okText="确定" cancelText="取消" title="是否关闭该需求？">
                        <Button type="danger" size="small" >结束</Button>
                      </Popconfirm>
                        
                    </span>
                    )
                }
              }]
        }
    }
    componentDidMount(){
        let {onGetAllData} = this.props;
        onGetAllData();   
    }
    render(){
        let {isShowEditDialog,onShowEdit,onCloseEdit,allData,editData} = this.props;
        return(
            <Fragment>
                <Table
                    dataSource={allData}
                    columns={this.state.columns}
                    bordered
                ></Table>
                <Button type="primary" onClick={onShowEdit}>添加需求</Button>
                <EditComponent 
                    isShowEditDialog={isShowEditDialog} 
                    editData={editData}
                    onClose={onCloseEdit}/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      isShowEditDialog:state.isShowEditDialog,
      allData:state.allData,
      editData:state.editData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onCloseData(id){
        dispatch(CloseData(id))
      },
      onEditData(id){
        dispatch(EditData(id));
      },
      onDelData(id){
        dispatch(DelData(id));
      },
      onGetAllData(data){
          dispatch(GetData(data));
      },
      onShowEdit() {
          dispatch(OpenEdit({}));
      },
      onCloseEdit() {
          dispatch(CloseEdit({}));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TableComponent);