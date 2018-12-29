import React, { PureComponent, Fragment } from 'react';
import { Table ,Button} from 'antd';
import columns from "./tableflat";
import Edit from "../EditDialog";

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
        return(
            <Fragment>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered={bordered}
                ></Table>
                <Button type="primary">添加需求</Button>
                <Edit></Edit>
            </Fragment>
        )
    }
}

export default TableComponent;