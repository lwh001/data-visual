import React ,{PureComponent,Fragment} from "react";
import {Progress} from "antd";
import {Link} from "react-router-dom";

class Home extends PureComponent{
    state={
        data:[{
            number: '1',
            needId:"Gb542",
            needName:"对话弹框",
            belongName:"百秀项目组",
            startTime:"2018.12.12",
            testTime:"2019.01.05",
            endTime:"2019.1.8",
            action:"" 
          },
          {
            number: '2',
            needId:"Gb542",
            needName:"商品弹框",
            belongName:"可得项目组",
            startTime:"2018.12.26",
            testTime:"2018.12.31",
            endTime:"2019.1.5",
            action:"" 
          },
          {
            number: '3',
            needId:"Gb542",
            needName:"社区模块",
            belongName:"Erp后台",
            startTime:"2018.12.10",
            testTime:"2018.12.16",
            endTime:"2019.1.4",
            action:"" 
          }],
          nowTime:""
    }
    componentDidMount(){
        let _this = this;
        setInterval(()=>{
            let time3 = Date.parse(new Date())/1000;//现在时间
            _this.setState({nowTime:time3})
        },1000)
        
    }
    render(){
        return(
            <Fragment>
                <Link to="/addData">添加需求</Link>
                {this.state.data.map((item,index)=>{
                    return(
                        <div key={index} style={{marginBottom:"20px"}}>
                            <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                                <div style={{marginRight:"20px"}}>
                                    需求编号<br/>{item.needId} 
                                </div>
                                <div style={{marginRight:"20px"}}>
                                     需求名称<br/>{item.needName}
                                </div>
                                <div style={{marginRight:"20px"}}>
                                    <Progress 
                                        percent={this.onCountTime(item.startTime,item.testTime)} 
                                        type="circle" 
                                        format={(percent) => percent>=100?"距离预发布已结束":"距离预发布"} ></Progress>
                                    </div>
                                    <Progress 
                                        percent={this.onCountTime(item.startTime,item.endTime)} 
                                        type="circle" 
                                        format={(percent) => percent>=100?"距离发布已结束":"距离发布"}
                                        ></Progress>
                                
                            </div>
                            <div style={{width:"500px"}}>
                                <Progress 
                                    percent={this.onCountTime(item.startTime,item.endTime)}  
                                    format={(percent) => percent>=100?"距离发布已结束":`距离发布已过 ${percent}%`}
                                    
                                    ></Progress>
                                <Progress 
                                    percent={this.onCountTime(item.startTime,item.testTime)} 
                                    format={(percent,successPercent) => percent>=100?`距离预发布已结束`:`距离预发布已过 ${percent}%`}
                                    ></Progress>
                            </div>
                        </div>
                    )
                })}
                
            </Fragment>
        )
    }
    onCountTime=(start,end)=>{
            let {nowTime} = this.state;
            let time1 = Date.parse(new Date(end))/1000; //结束时间
            let time2 = Date.parse(new Date(start))/1000;//开始时间
            let xx=Number((nowTime-time2)/(time1-time2)*100).toFixed();
            return xx;
    }
}

export default Home;