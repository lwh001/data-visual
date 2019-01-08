import {
    SHOW_MODAl,
    CLOSE_MODAL,
    GET_All_DATA,
    ADD_DATA,
    DEL_DATA,
    EDIT_DATA,
    CLOSE_DATA
} from "./actionsType";
import {requestApi} from "../config";

const dealData=(res)=>{
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

export const CloseEdit = (data) => {
    return (dispatch) => {
        dispatch({
            type: CLOSE_MODAL,
        });
    };
}

export const OpenEdit = (data) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAl,
        });
    };
}

export const GetData = (data) => {
    return dispatch => {
        fetch(`${requestApi}/api/BackGround/GetPlanListByPage?pageIndex=1&pageSize=10000`).then(res=>res.json()).then(res=>{
            res = res.items.map((item)=>{
               let data = dealData(item);
               return data;
           }) 
           dispatch({
                type: GET_All_DATA,
                data:res
            });
       })       
    };
}

export const AddData = (data) => {
    return dispatch => {
        dispatch({
            type: ADD_DATA,
            data
        });
    };
}

export const DelData = (id)=>{
    return dispatch=>{
        fetch(`${requestApi}/api/BackGround/DelPlan?id=`+id)
        .then(res=>res.json())
        .then(res=>{
            fetch(`${requestApi}/api/BackGround/GetPlanListByPage?pageIndex=1&pageSize=10000`).then(res=>res.json()).then(res=>{
                res = res.items.map((item)=>{
                   let data = dealData(item);
                   return data;
               }) 
               dispatch({
                    type: GET_All_DATA,
                    data:res
                });
           }) 
        })
    }
}

export const EditData = (id)=>{
    return dispatch=>{
        fetch(`${requestApi}/api/BackGround/GetPlan?id=`+id)
        .then(res=>res.json())
        .then(res=>{
            res= dealData(res);
            dispatch({
                type: EDIT_DATA,
                data:res
            });
        })
    }
}

export const CloseData = (id)=>{
    return dispatch=>{
        fetch(`${requestApi}/api/BackGround/GetPlan?id=`+id)
        .then(res=>res.json())
        .then(res=>{
            res.status = "2";
            fetch(`${requestApi}/api/BackGround/UpdatePlan`,{
                method:"POST",
                body:JSON.stringify(res),
                headers: {
                    'Content-Type': 'application/json',
                },}).then(res=>res.json()).then(res=>{
                dispatch({
                    type: CLOSE_DATA
                });
           }) 

        })
    }
}