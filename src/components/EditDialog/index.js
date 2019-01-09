import React, { PureComponent, Fragment } from 'react';
import { DatePicker,Form  ,Button,Input,Select,Modal} from 'antd';
import {connect} from "react-redux";
import moment from "moment";
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
  const dealData=(res)=>{
    for(var i in res){
        switch(i){
            case("priority"):{
                switch(res[i]){
                    case("一般"):{
                        res["priority"]=1;
                        break;
                    }
                    case("高"):{
                        res["priority"]=2;
                        break;
                    }
                    
                    default:{
                        res["priority"]=res["priority"];
                    }
                }
                break;
            }
            case("status"):{
                switch(res[i]){
                    case("正常"):{
                        res["status"]=1;
                        break;
                    }
                    case("结束"):{
                        res["status"]=2;
                        break;
                    }
                    
                    default:{
                        res["status"]=res["status"];
                    }
                }
                break;
            }
            case("mainGroup"):{
                switch(res[i]){
                    case("kede"):{
                        res["mainGroup"]=1;
                        break;
                    }
                    case("百秀"):{
                        res["mainGroup"]=2;
                        break;
                    }
                    case("中心"):{
                        res["mainGroup"]=3;
                        break;
                    }
                    case("架构"):{
                        res["mainGroup"]=4;
                        break;
                    }
                    case("后台"):{
                        res["mainGroup"]=5;
                        break;
                    }
                    case("erp"):{
                        res["mainGroup"]=6;
                        break;
                    }
                    default:{
                        res["mainGroup"]=res["mainGroup"]
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

class Edit extends PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        let {getFieldDecorator} = this.props.form;
        const Option = Select.Option;
        let {isShowEditDialog,onClose,editData} = this.props;
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
                                        }],
                                initialValue:editData===null?"":editData["requertNo"]
                                })(
                                        <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="需求简称" {...formItemLayout}>
                        {getFieldDecorator('requestName', {
                                rules: [
                                        {
                                            required: true, message: '请输入需求简称',
                                        }],
                                initialValue:editData===null?"":editData["requestName"]    
                                    })(
                                        <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="优先级" {...formItemLayout}>
                        {getFieldDecorator('priority', {
                                rules: [
                                    {
                                        required: true, message: '请选择优先级',
                                    }],
                                initialValue:editData===null?"":editData["priority"]
                                })(
                                    <Select  style={{ width: 120 }} >
                                        <Option value="1">一般</Option>
                                        <Option value="2">高</Option>
                                    </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="所属项目组" {...formItemLayout}>
                        {getFieldDecorator('mainGroup', {
                                rules: [
                                        {
                                            required: true, message: '请选择项目组',
                                        }],
                                    initialValue:editData===null?"":editData["mainGroup"]
                                    })(
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
                                        }],
                                    initialValue:editData===null?"":moment(editData["beginTime"], 'YYYY/MM/DD')
                                    })(
                                        <DatePicker onChange={this.onChange} format='YYYY/MM/DD'/>
                        )}
                    </Form.Item>
                    <Form.Item label="预发布时间" {...formItemLayout}>
                        {getFieldDecorator('preReleaseTime', {
                                rules: [
                                        {
                                            required: true, message: '请输入预发布时间',
                                        }],
                                    initialValue:editData===null?"":moment(editData["preReleaseTime"], 'YYYY/MM/DD')
                                    })(
                                        <DatePicker onChange={this.onChange} format='YYYY/MM/DD'/>
                        )}
                    </Form.Item>
                    <Form.Item label="发布时间" {...formItemLayout}>
                        {getFieldDecorator('releaseTime', {
                                rules: [
                                        {
                                            required: true, message: '请输入发布时间',
                                        }],
                                    initialValue:editData===null?"":moment(editData["releaseTime"], 'YYYY/MM/DD')
                                    })(
                                        <DatePicker onChange={this.onChange} format='YYYY/MM/DD'/>
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
    onChange = (date, dateString)=>{
        console.log(dateString);
    }
    onHandleSubmit = (e) => {
        let {onCloseEdit,onGetAllData,editData}  =this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.form.resetFields();
                values.statusTime=new Date();
                values["beginTime"]=values["beginTime"].format('YYYY-MM-DD');
                values["releaseTime"]=values["releaseTime"].format('YYYY-MM-DD');
                values["preReleaseTime"]= values["preReleaseTime"].format('YYYY-MM-DD');
                if(editData){
                    values  = dealData(values);
                    values["id"]=editData["id"];
                    values["status"]=editData["status"]=="正常"?1:2;
                    fetch(`${requestApi}/api/BackGround/UpdatePlan`,{
                        method:"POST",
                        body:JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json',
                        },}).then(res=>res.json()).then((res)=>{
                            console.log(res);
                            onCloseEdit();
                            onGetAllData();
                        })
                }else{
                    values.status="1";
                    fetch(`${requestApi}/api/BackGround/AddPlan`,{
                        method:"POST",
                        body:JSON.stringify(values),
                        headers: {
                            "content-type": "application/json"
                        },}).then(res=>res.json()).then((res)=>{
                            onCloseEdit();
                            onGetAllData();
                        })
                }
                
            }
        });
        
    }
      
}
const mapStateToProps = (state) => {
    return state;
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