// Define action types
export const CHANGE_SOURCE = 'CHANGE_SOURCE';
export const PURGE = 'PURGE';

export const changeSource = (pad, sampleId) => dispatch => {
    dispatch({
        type: CHANGE_SOURCE,
        pad,
        sampleId
    });
};

export const clearPads = () => dispatch =>{
    dispatch({
        type: PURGE
    })
}
