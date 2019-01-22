import React ,{PureComponent,Fragment} from "react";


import { Progress} from "antd";
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
    ItemList,
    DemandNumber,
    DemandName,
    PublishTime,
    PublishProgress,
    PublishContain,
    PublishText,
    ProgressState,

    ProgressWarn,
    WarnIcon
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
                delay: 15000,
                disableOnInteraction:false
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
                        <DemandName>
                            需求简称
                        </DemandName>
                        <PublishTime>
                            配合组
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
                            
                            <ItemList backgroundColor={item.bgColor}>
                                {item.priority==="2"?<ImportantLevel>
                                    <WarnIcon/>
                                </ImportantLevel>:<ImportantLevel/>}
                                <DemandNumber>
                                    <p>{item.mainGroup}</p> 
                                </DemandNumber>
                                <DemandName>
                                    <p>{item.requestName}</p>
                                </DemandName>
                                <PublishTime>
                                    {item.matchingGroup===null?null:item.matchingGroup.map((item,index)=>{
                                        return (
                                            <div><p>{item}</p></div>
                                        )
                                    })}
                                </PublishTime>
                                
                            
                                <PublishContain>
                                    <PublishProgress>
                                        <PublishText>{item.preReleaseTime}</PublishText>
                                        <ProgressState>
                                            <Progress percent={pre} strokeWidth={20} strokeLinecap="square" />
                                        </ProgressState>
                                    </PublishProgress>
                                    <PublishProgress>
                                        <PublishText>{item.releaseTime}</PublishText>
                                        <ProgressState>
                                        <Progress percent={rel} strokeWidth={20} strokeLinecap="square"/>
                                        </ProgressState>
                                    </PublishProgress>
                                </PublishContain>
                            </ItemList>
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
        val = val*100;
        return parseInt(val);
    }
    dealData=(res)=>{
        for(var i in res){
            switch(i){
                case("mainGroup"):{
                    switch(res[i]){
                        case(1):{
                            res["mainGroup"]="kede";
                            res["bgColor"]="rgba(228, 84, 205, 0.19)";
                            break;
                        }
                        case(2):{
                            res["mainGroup"]="百秀";
                            res["bgColor"]="rgba(84, 117, 228, 0.19)";
                            break;
                        }
                        case(3):{
                            
                            res["mainGroup"]="业务平台";
                            res["bgColor"]="rgba(84, 228, 193, 0.19)";
                            break;
                        }
                        case(4):{
                            
                            res["mainGroup"]="技术平台";
                            res["bgColor"]="rgba(101, 241, 53, 0.19)";
                            break;
                        }
                        case(5):{
                            res["mainGroup"]="后台";
                            res["bgColor"]="rgba(224, 52, 52, 0.15)";
                            break;
                        }
                        case(6):{
                            res["mainGroup"]="erp";
                            res["bgColor"]="rgba(228, 138, 84, 0.19)";
                            break;
                        }
                        default:{
                            
                            res["mainGroup"]="无名";
                            res["bgColor"]="rgba(228, 138, 84, 0.19)";
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
                case("matchingGroup"):{
                    if(res["matchingGroup"]===null){
                        res["matchingGroup"]=null
                        break;
                    }else{
                        res["matchingGroup"]=res["matchingGroup"].split(",");
                        let newRes = res["matchingGroup"].map((item,index)=>{
                            if(item=="1"){
                                return "kede"
                            }
                            if(item=="2"){
                                return "百秀"
                            }
                            if(item=="3"){
                                return "业务平台"
                            }
                            if(item=="4"){
                                return "技术平台"
                            }
                            if(item=="5"){
                                return "后台"
                            }
                            if(item=="6"){
                                return "erp"
                            }

                        })
                        res["matchingGroup"] = newRes
                        console.log(res["matchingGroup"])
                        break;
                    }
                    
                }
                default:{
                    
                }
    
            }
        }
        return res;
    }
}

export default Home;