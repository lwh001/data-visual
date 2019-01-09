import React ,{PureComponent,Fragment} from "react";
import {Progress} from "antd";
import {requestApi } from "../../config";
import Swiper from "swiper";
import {
    ContainWrapper,
    SwiperGlobalStyle,
    Title,
    ScreenList,
    DemandNumber,
    DemandName,
    PublishTime,
    PublishProgress,
    PublishContain,
    PublishText,
    ProgressState,
    WarnIcon,
    ProgressWarn
    } from "./style";
import  moment from "moment";

class Home extends PureComponent{
    state={
        data:[],
        nowTime:""
    }
    componentDidMount(){
        let _this = this;
        _this.onGetData();
        let swiperContainer = new Swiper(".swiper-container", {
            direction:'vertical',
            observer:true,
            slidesPerView:"5",
            autoplay: {
                delay: 3000,
            },
        });
        let timer = setInterval(_this.onGetData,3600000)  //一个小时刷新一次数据 
    }
    onGetData=()=>{
        let _this = this;
        fetch(`${requestApi}/api/Home`).then(res=>res.json()).then(res=>{
            res = res.map((item)=>{
                let data = _this.dealData(item);
                return data;
            }) 
            console.log(res);
            _this.setState({
                data:res
            })
        })
    }
    render(){
        return(
            <Fragment>
            <SwiperGlobalStyle></SwiperGlobalStyle>
            <Title>开发部需求监控平台</Title>
            
            <ContainWrapper className="swiper-container">
                <ScreenList>
                        <ProgressWarn>
                            
                        </ProgressWarn>
                        <DemandNumber>
                            项目组
                        </DemandNumber>
                        <DemandNumber>
                            需求编号
                        </DemandNumber>
                        <DemandName>
                                需求名称
                        </DemandName>
                        <PublishTime>
                                开始时间
                        </PublishTime>
                        
                    <PublishContain>
                        <PublishProgress>
                            <PublishText>预发布/发布时间</PublishText>
                        </PublishProgress>
                    </PublishContain>
                </ScreenList>
                <div className="swiper-wrapper">
                {this.state.data.map((item,index)=>{
                    return(
                        <ScreenList key={index} className="swiper-slide">
                                {item.priority==="2"?<ProgressWarn>
                                    <WarnIcon/>
                                </ProgressWarn>:<ProgressWarn/>}
                                <DemandNumber>
                                    {item.mainGroup} 
                                </DemandNumber>
                                <DemandNumber>
                                    {item.requertNo} 
                                </DemandNumber>
                                <DemandName>
                                     {item.requestName}
                                </DemandName>
                                <PublishTime>
                                     {item.beginTime}
                                </PublishTime>
                                
                            <PublishContain>
                                <PublishProgress>
                                    <PublishText>发预发布时间</PublishText>
                                    <ProgressState>
                                        <Progress percent={this.onCountTime(item.prePercent)}  strokeLinecap="square" showInfo={false} ></Progress>
                                    </ProgressState>
                                </PublishProgress>
                                <PublishProgress>
                                    <PublishText>发布时间</PublishText>
                                    <ProgressState>
                                        <Progress  percent={this.onCountTime(item.relPercent)} strokeLinecap="square" showInfo={false} height="20"></Progress>
                                    </ProgressState>
                                </PublishProgress>
                            </PublishContain>
                        </ScreenList>
                    )
                })}
                 </div>
            </ContainWrapper>
            </Fragment>
            
        )
    }
    onCountTime=(val)=>{
        if(val>1||val<0){
            val = 100;
            return val;
        }
        val = val*100
        return val;
    }
    dealData=(res)=>{
        for(var i in res){
            switch(i){
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
                case("beginTime"):{
                    res["beginTime"]=moment(res["beginTime"]).format('YYYY-MM-DD');
                    break;
                }
                default:{
                    
                }
    
            }
        }
        return res;
    }
}

export default Home;