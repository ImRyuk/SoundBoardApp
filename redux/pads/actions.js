// Define action types
export const CHANGE_SOURCE = 'CHANGE_SOURCE';
export const PURGE = 'PURGE';

export const changeSource = sample => dispatch => {
    dispatch({
        type: CHANGE_SOURCE,
        payload: sample
    });
};

export const clearPads = () => dispatch =>{
    dispatch({
        type: PURGE
    })
}
