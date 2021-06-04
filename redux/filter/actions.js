// Define action types
export const SET_FILTER = 'SET_FILTER';
export const TOGGLE_SAMPLE = 'TOGGLE_SAMPLE';

export const setFilter = filter => {
    return {
        type: SET_FILTER,
        payload : filter
    };
};

export const item = item => {
    return {
        type: TOGGLE_SAMPLE,
        payload : item
    };
};
