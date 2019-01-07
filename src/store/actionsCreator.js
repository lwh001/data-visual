import {
    SHOW_MODAl,
    CLOSE_MODAL,
    GET_All_DATA,
    ADD_DATA
} from "./actionsType";

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
        dispatch({
            type: GET_All_DATA,
            data:data
        });
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
