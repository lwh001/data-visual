import {
    SHOW_MODAl,
    CLOSE_MODAL
} from "./actionsType";

const defaultState = {
    isShowEditDialog:false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case(SHOW_MODAl):
        {
            return {
                isShowEditDialog:true

            }
        }
        case(CLOSE_MODAL):
        {
            return {
                isShowEditDialog:false
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