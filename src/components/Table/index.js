import React, { PureComponent, Fragment } from 'react';
import { Table ,Button} from 'antd';
import columns from "./tableflat";
import EditComponent from "../EditDialog";
import {connect} from "react-redux";
import {
    CloseEdit,
    OpenEdit
} from "../../store/actionsCreator";

class TableComponent extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            dataSource:[{
                number: '1',
                needId:"Gb542",
                needName:"对话弹框",
                belongName:"百秀项目组",
                startTime:"2018.12.26",
                testTime:"2018.12.31",
                endTime:"2019.1.1",
                action:"" 
              },
              {
                number: '2',
                needId:"Gb542",
                needName:"对话弹框",
                belongName:"百秀项目组",
                startTime:"2018.12.26",
                testTime:"2018.12.31",
                endTime:"2019.1.1",
                action:"" 
              },
              {
                number: '3',
                needId:"Gb542",
                needName:"对话弹框",
                belongName:"百秀项目组",
                startTime:"2018.12.26",
                testTime:"2018.12.31",
                endTime:"2019.1.1",
                action:"" 
              }],
            bordered:true
        }
    }
    render(){
        let {dataSource,bordered} = this.state;
        let {isShowEditDialog,onShowEdit,onCloseEdit} = this.props;
        return(
            <Fragment>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered={bordered}
                ></Table>
                <Button type="primary" onClick={onShowEdit}>添加需求</Button>
                <EditComponent 
                    isShowEditDialog={isShowEditDialog} 
                    onClose={onCloseEdit}/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      isShowEditDialog:state.isShowEditDialog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onShowEdit() {
          dispatch(OpenEdit({}));
      },
      onCloseEdit() {
        dispatch(CloseEdit({}));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TableComponent);