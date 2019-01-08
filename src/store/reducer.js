import {
    SHOW_MODAl,
    CLOSE_MODAL,
    GET_All_DATA,
    EDIT_DATA
} from "./actionsType";
import {requestApi} from "../config";


let defaultState = {
    isShowEditDialog:false,
    allData:[],
    editData:{}
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case(SHOW_MODAl):
        {
            return {
                isShowEditDialog:true,
                allData:state.allData,
                editData:state.editData === undefined?null:null,

            }
        }
        case(CLOSE_MODAL):
        {
            return {
                isShowEditDialog:false,
                allData:state.allData,
                editData:state.editData === undefined?null:null,
            }
        }
        case(GET_All_DATA):
        {
            state.allData=action.data
            return {
                allData:state.allData,
                isShowEditDialog:false,
                editData:state.editData === undefined?null:null,
            }
        }
        case(EDIT_DATA):
        {
            state.editData=action.data
            return {
                isShowEditDialog:true,
                editData:state.editData === undefined?null:action.data,
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