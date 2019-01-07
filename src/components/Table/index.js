import React, { PureComponent, Fragment } from 'react';
import { Table ,Button} from 'antd';
import columns from "./tableflat";
import {Link} from "react-router-dom";
import EditComponent from "../EditDialog";
import {connect} from "react-redux";
import {requestApi} from "../../config";
import {
    CloseEdit,
    OpenEdit,
    GetData
} from "../../store/actionsCreator";

class TableComponent extends PureComponent{
    constructor(props){
        super(props);
    }
    componentDidMount(){
       this.getAllData();   
    }
    dealData=(res)=>{
        for(var i in res){
            switch(i){
                case("priority"):{
                    switch(res[i]){
                        case(1):{
                            res["priority"]="一般";
                            break;
                        }
                        case(2):{
                            res["priority"]="高";
                            break;
                        }
                        
                        default:{
                            res["priority"]="无名";
                        }
                    }
                    break;
                }
                case("mainGroup"):{
                    switch(res[i]){
                        case(1):{
                            res["mainGroup"]="kede";
                            break;
                        }
                        case(2):{
                            res["mainGroup"]="百秀";
                            break;
                        }
                        case(3):{
                            res["mainGroup"]="中心";
                            break;
                        }
                        case(4):{
                            res["mainGroup"]="架构";
                            break;
                        }
                        case(5):{
                            res["mainGroup"]="后台";
                            break;
                        }
                        case(6):{
                            res["mainGroup"]="erp";
                            break;
                        }
                        default:{
                            res["mainGroup"]="无名"
                        }
                    }
                    break;
                }
                default:{
                    
                }
    
            }
        }
        return res;
    }
    getAllData=()=>{
        let {onGetAllData} = this.props;
        fetch(`${requestApi}/api/BackGround/GetPlanListByPage?pageIndex=1&pageSize=10000`).then(res=>res.json()).then(res=>{
            res = res.items.map((item)=>{
               let data = this.dealData(item);
               return data;
           }) 
           onGetAllData(res);
       })
    }
    render(){
        let {isShowEditDialog,onShowEdit,onCloseEdit,allData} = this.props;
        return(
            <Fragment>
                <Link to="/">返回</Link>
                <Table
                    dataSource={allData}
                    columns={columns}
                    bordered
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
      isShowEditDialog:state.isShowEditDialog,
      allData:state.allData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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