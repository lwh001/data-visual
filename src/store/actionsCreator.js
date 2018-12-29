import {
    SHOW_MODAl,
    CLOSE_MODAL
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
