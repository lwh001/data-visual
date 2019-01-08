import React ,{PureComponent,Fragment} from "react";
import {Progress} from "antd";
import moment from "moment";
import {requestApi } from "../../config";

class Home extends PureComponent{
    state={
        data:[],
          nowTime:""
    }
    componentDidMount(){
        let _this = this;
        fetch(`${requestApi}/api/Home`).then(res=>res.json()).then(res=>{
            _this.setState({
                data:res
            })
        })
    }
    render(){
        return(
            <Fragment>
                {this.state.data.map((item,index)=>{
                    return(
                        <div key={index} style={{marginBottom:"20px"}}>
                            <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                                <div style={{marginRight:"20px"}}>
                                    需求编号<br/>{item.requertNo} 
                                </div>
                                <div style={{marginRight:"20px"}}>
                                     需求名称<br/>{item.requestName}
                                </div>
                                <div style={{marginRight:"20px"}}>
                                     预发布时间<br/>{item.preReleaseTime}
                                </div>
                                <div style={{marginRight:"20px"}}>
                                    <Progress 
                                        percent={this.onCountTime(item.prePercent)} 
                                        type="circle" 
                                        format={(percent) => percent>=100?"距离预发布已结束":"距离预发布"} ></Progress>
                                </div>
                                <div style={{marginRight:"20px"}}>
                                     发布时间<br/>{item.releaseTime}
                                </div>
                                    <Progress 
                                        percent={this.onCountTime(item.relPercent)} 
                                        type="circle" 
                                        format={(percent) => percent>=100?"距离发布已结束":"距离发布"}
                                        ></Progress>
                                
                            </div>
                            {/* <div style={{width:"500px"}}>
                                <Progress 
                                    percent={this.onCountTime(item.startTime,item.endTime)}  
                                    format={(percent) => percent>=100?"距离发布已结束":`距离发布已过 ${percent}%`}
                                    
                                    ></Progress>
                                <Progress 
                                    percent={this.onCountTime(item.startTime,item.testTime)} 
                                    format={(percent,successPercent) => percent>=100?`距离预发布已结束`:`距离预发布已过 ${percent}%`}
                                    ></Progress>
                            </div> */}
                        </div>
                    )
                })}
                
            </Fragment>
        )
    }
    onCountTime=(val)=>{
        if(val>1){
            return 100;
        }
        val = val*100
        return val;
    }
}

export default Home;