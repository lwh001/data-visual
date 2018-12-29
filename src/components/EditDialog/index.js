import React, { PureComponent, Fragment } from 'react';
import { DatePicker,Form  ,Button,Input,Select,Modal} from 'antd';

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
                        {getFieldDecorator('needId', {
                                rules: [
                                        {
                                            required: true, message: '请输入需求编号',
                                        }],})(
                                        <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="需求简称" {...formItemLayout}>
                        {getFieldDecorator('needName', {
                                rules: [
                                        {
                                            required: true, message: '请输入需求简称',
                                        }],})(
                                        <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="所属项目组" {...formItemLayout}>
                        {getFieldDecorator('belongName', {
                                rules: [
                                        {
                                            required: true, message: '请选择项目组',
                                        }],})(
                                        <Select  style={{ width: 120 }} >
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" >Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="开始时间" {...formItemLayout}>
                        {getFieldDecorator('startTime', {
                                rules: [
                                        {
                                            required: true, message: '请输入开始时间',
                                        }],})(
                                        <DatePicker onChange={this.onChange} />
                        )}
                    </Form.Item>
                    <Form.Item label="预发布时间" {...formItemLayout}>
                        {getFieldDecorator('testTime', {
                                rules: [
                                        {
                                            required: true, message: '请输入预发布时间',
                                        }],})(
                                        <DatePicker onChange={this.onChange} />
                        )}
                    </Form.Item>
                    <Form.Item label="发布时间" {...formItemLayout}>
                        {getFieldDecorator('endTime', {
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
    onChange = (date, dateString)=>{
        console.log(dateString);
    }
    onHandleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.props.form.resetFields()
            console.log('Received values of form: ', values,values.endTime);
          }
        });
        
      }
      
}
const EditComponent = Form.create()(Edit);

export default EditComponent;