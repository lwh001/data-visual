import React ,{PureComponent,Fragment} from "react";
import {Spin } from "antd";
import {LoadingBox} from  "./style";

export default (props)=>{
    if(props.isShow){
        return (
            <LoadingBox>
                <Spin></Spin>
            </LoadingBox>
        )
    }
    return null;
    
}