import React ,{PureComponent,Fragment} from "react";
import {Progress} from "antd";
import {ProgressBar} from "react-bootstrap";
import {requestApi } from "../../config";
import Swiper from "swiper";
import {
    BodyWrapper,
    TableTitleWrapper,
    ContainWrapper,
    SwiperGlobalStyle,
    Title,
    ScreenTab,
    ImportantLevel,
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
            slidesPerView:"4",
            autoplay: {
                delay: 10000,
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
            <BodyWrapper>
                <Title>开发部需求监控平台</Title>
                <TableTitleWrapper >
                    <ScreenTab>
                        <ImportantLevel>
                            优先级
                        </ImportantLevel>
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
                            预发布/发布时间(计划百分比)
                        </PublishContain>
                    </ScreenTab>
                    </TableTitleWrapper>
                <ContainWrapper className="swiper-container">
                <div className="swiper-wrapper">
                {this.state.data.map((item,index)=>{
                    let pre = this.onCountTime(item.prePercent);
                    let rel = this.onCountTime(item.relPercent);
                    return(
                        <ScreenList key={index} className="swiper-slide">
                            <div className="itemList">
                                {item.priority==="2"?<ImportantLevel>
                                    <WarnIcon/>
                                </ImportantLevel>:<ImportantLevel/>}
                                <DemandNumber>
                                    <p>{item.mainGroup}</p> 
                                </DemandNumber>
                                <DemandNumber>
                                    <p>{item.requertNo}</p> 
                                </DemandNumber>
                                <DemandName>
                                    <p>{item.requestName}</p>
                                </DemandName>
                                <PublishTime>
                                    <p>{item.beginTime}</p>
                                </PublishTime>
                                
                            <PublishContain>
                                <PublishProgress>
                                    <PublishText>{item.preReleaseTime}</PublishText>
                                    <ProgressState>
                                        <Progress percent={pre} strokeWidth="20px" strokeLinecap="square" />
                                    </ProgressState>
                                </PublishProgress>
                                <PublishProgress>
                                    <PublishText>{item.releaseTime}</PublishText>
                                    <ProgressState>
                                    <Progress percent={rel} strokeWidth="20px" strokeLinecap="square"/>
                                    </ProgressState>
                                </PublishProgress>
                            </PublishContain>
                            </div>
                        </ScreenList>
                    )
                })}
                 </div>
                 
            </ContainWrapper>
            </BodyWrapper>
            </Fragment>
            
        )
    }
    onCountTime=(val)=>{
        if(val>1||val<0){
            val = 100;
            return val;
        }
        val = val*100
        console.log(parseInt(val));
        return parseInt(val);
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
                case("preReleaseTime"):{
                    res["preReleaseTime"]=moment(res["preReleaseTime"]).format('YYYY-MM-DD');
                    break;
                }
                case("releaseTime"):{
                    res["releaseTime"]=moment(res["releaseTime"]).format('YYYY-MM-DD');
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