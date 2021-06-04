// Define action types
export const TOGGLE_SAMPLE = 'TOGGLE_SAMPLE';

export const item = item => {
    return {
        type: TOGGLE_SAMPLE,
        payload : item
    };
};
