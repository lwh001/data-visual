import React, { PureComponent, Fragment } from 'react';
import { DatePicker,Form  ,Button,Input,Select,Modal} from 'antd';
import {connect} from "react-redux";
import {requestApi} from "../../config";
import {
    CloseEdit,
    GetData
} from "../../store/actionsCreator";

const formItemLayout = {
    labelCol: {
      span:5,
      offset:0
    },
    wrapperCol: {
        span:10,
        offset:0
    },
  };
const tailFormItemLayout = {
    wrapperCol: {
        span:5,
        offset:10
    }
  };

class Edit extends PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        let {getFieldDecorator} = this.props.form;
        const Option = Select.Option;
        let {isShowEditDialog,onClose} = this.props;
        return(
            <Fragment>
                <Modal 
                    visible={isShowEditDialog}
                    onOk={onClose}
                    onCancel={onClose}
                    footer={null}>
                <Form onSubmit={this.onHandleSubmit} >
                    <Form.Item label="需求编号" {...formItemLayout}>
                        {getFieldDecorator('requertNo', {
                                rules: [
                                        {
                                            required: true, message: '请输入需求编号',
                                        }],})(
                                        <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="需求简称" {...formItemLayout}>
                        {getFieldDecorator('requestName', {
                                rules: [
                                        {
                                            required: true, message: '请输入需求简称',
                                        }],})(
                                        <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="优先级" {...formItemLayout}>
                        {getFieldDecorator('priority', {
                                rules: [
                                    {
                                        required: true, message: '请选择优先级',
                                    }],})(
                                    <Select  style={{ width: 120 }} >
                                        <Option value="1">低</Option>
                                        <Option value="2">高</Option>
                                    </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="所属项目组" {...formItemLayout}>
                        {getFieldDecorator('mainGroup', {
                                rules: [
                                        {
                                            required: true, message: '请选择项目组',
                                        }],})(
                                        <Select  style={{ width: 120 }} >
                                            <Option value="1">kede</Option>
                                            <Option value="2">百秀</Option>
                                            <Option value="3" >中心</Option>
                                            <Option value="4">架构</Option>
                                            <Option value="5">后台</Option>
                                            <Option value="6">erp</Option>
                                        </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="开始时间" {...formItemLayout}>
                        {getFieldDecorator('beginTime', {
                                rules: [
                                        {
                                            required: true, message: '请输入开始时间',
                                        }],})(
                                        <DatePicker onChange={this.onChange} />
                        )}
                    </Form.Item>
                    <Form.Item label="预发布时间" {...formItemLayout}>
                        {getFieldDecorator('preReleaseTime', {
                                rules: [
                                        {
                                            required: true, message: '请输入预发布时间',
                                        }],})(
                                        <DatePicker onChange={this.onChange} />
                        )}
                    </Form.Item>
                    <Form.Item label="发布时间" {...formItemLayout}>
                        {getFieldDecorator('releaseTime', {
                                rules: [
                                        {
                                            required: true, message: '请输入发布时间',
                                        }],})(
                                        <DatePicker onChange={this.onChange} />
                        )}
                        
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                    
                </Form>
                </Modal>
            </Fragment>
        )
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
    onChange = (date, dateString)=>{
        console.log(dateString);
    }
    onHandleSubmit = (e) => {
        let {onCloseEdit}  =this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.props.form.resetFields();
            onCloseEdit();
            values.states="1";
            values.statusTime=new Date();
            values["beginTime"]=values["beginTime"].format('YYYY-MM-DD');
            values["releaseTime"]=values["releaseTime"].format('YYYY-MM-DD');
            values["preReleaseTime"]= values["preReleaseTime"].format('YYYY-MM-DD');
            fetch(`${requestApi}/api/BackGround/AddPlan`,{
                method:"POST",
                body:JSON.stringify(values),
                headers: {
                    "content-type": "application/json"
                  },}).then(res=>{res.json()}).then((res)=>{
                    console.log(res);
                    this.getAllData();
                })
          }
        });
        
      }
      
}
const mapStateToProps = (state) => {
    //取默认state
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllData(data){
            dispatch(GetData(data));
        },
        onCloseEdit() {
          dispatch(CloseEdit({}));
      }
    }
  }
  

const EditComponent = Form.create()(Edit);

export default connect(mapStateToProps,mapDispatchToProps)(EditComponent);