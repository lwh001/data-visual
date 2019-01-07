import {
    SHOW_MODAl,
    CLOSE_MODAL,
    GET_All_DATA,
    ADD_DATA
} from "./actionsType";
import {requestApi} from "../config";

// const getData=()=>{
//     fetch(`${requestApi}/api/BackGround/GetPlanListByPage?pageIndex=1&pageSize=10000`).then(res=>res.json()).then(res=>{
//         res = res.items.map((item)=>{
//            let data = dealData(item);
//            return data;
//        }) 
//        defaultState.allData=res;
//        console.log(defaultState)
//    })
//    console.log(defaultState)
// }

// const dealData=(res)=>{
//     for(var i in res){
//         switch(i){
//             case("priority"):{
//                 switch(res[i]){
//                     case(1):{
//                         res["priority"]="一般";
//                         break;
//                     }
//                     case(2):{
//                         res["priority"]="高";
//                         break;
//                     }
                    
//                     default:{
//                         res["priority"]="无名";
//                     }
//                 }
//                 break;
//             }
//             case("mainGroup"):{
//                 switch(res[i]){
//                     case(1):{
//                         res["mainGroup"]="kede";
//                         break;
//                     }
//                     case(2):{
//                         res["mainGroup"]="百秀";
//                         break;
//                     }
//                     case(3):{
//                         res["mainGroup"]="中心";
//                         break;
//                     }
//                     case(4):{
//                         res["mainGroup"]="架构";
//                         break;
//                     }
//                     case(5):{
//                         res["mainGroup"]="后台";
//                         break;
//                     }
//                     case(6):{
//                         res["mainGroup"]="erp";
//                         break;
//                     }
//                     default:{
//                         res["mainGroup"]="无名"
//                     }
//                 }
//                 break;
//             }
//             default:{
                
//             }

//         }
//     }
//     return res;
// }

let defaultState = {
    isShowEditDialog:false,
    allData:[]
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case(SHOW_MODAl):
        {
            return {
                isShowEditDialog:true,
                allData:state.allData

            }
        }
        case(CLOSE_MODAL):
        {
            return {
                isShowEditDialog:false,
                allData:state.allData
            }
        }
        case(GET_All_DATA):
        {
            state.allData=action.data
            return {
                allData:state.allData
            }
        }
        default:
            return state;
    }
}



// function textReducer (state,action){
//     switch (action.type) {
//         case(two.changeText):
//         {
//             return action.text
//         }
//         default:
//             return state;
//     }
// }
// function colorReducer (state,action){
//     switch (action.type) {
//         case(two.colorChange):
//         {
//             return action.color
//         }
//         default:
//             return state;
//     }
// }

// export default (state=defaultState,action)=>{
//     return{
//         text:textReducer(state.text,action),
//         color:colorReducer(state.color,action)
//     }
// }