// Define action types
export const ADD_RECORD_TO_LIBRARY = 'ADD_RECORD_TO_LIBRARY';
export const REMOVE_RECORD_FROM_LIBRARY = 'REMOVE_RECORD_FROM_LIBRARY';
export const PURGE = 'PURGE';

export const addSample = sample => {
    return {
        type: ADD_RECORD_TO_LIBRARY,
        payload : sample
    };
};

export const removeSample = sample => dispatch => {
    dispatch({
        type: REMOVE_RECORD_FROM_LIBRARY,
        payload: sample
    });
};

export const clearStore = () => dispatch =>{
    dispatch({
        type: PURGE
    })
}
