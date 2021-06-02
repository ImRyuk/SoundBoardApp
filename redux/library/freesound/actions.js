// Define action types
export const ADD_TO_LIBRARY = 'ADD_TO_LIBRARY';
export const REMOVE_FROM_LIBRARY = 'REMOVE_FROM_LIBRARY';
export const CHECK_IF_EXISTS = 'CHECK_IF_EXISTS';
export const EDIT = 'EDIT';

export const addSample = sample => {
    return {
        type: ADD_TO_LIBRARY,
        payload : sample
    };
};

export const removeSample = sample => dispatch => {
    dispatch({
        type: REMOVE_FROM_LIBRARY,
        payload: sample
    });
};

export const check = sample => dispatch => {
    dispatch({
        type: CHECK_IF_EXISTS,
        payload: sample
    });
};

export const edit = sample => dispatch => {
    dispatch({
        type: EDIT,
        payload: sample
    });
};
