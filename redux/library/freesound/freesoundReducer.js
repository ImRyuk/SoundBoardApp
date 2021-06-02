import {
    ADD_TO_LIBRARY, CHECK_IF_EXISTS,
    REMOVE_FROM_LIBRARY
} from './actions';

const initialState = {
    samples: []
};

const freesoundReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_LIBRARY:
            console.log(action);
            let id = action.payload.id;
            let name = action.payload.name;
            let description = action.payload.description;
            let duration = action.payload.duration;
            let preview = action.payload.previews['preview-lq-mp3'];
            let image = action.payload.images.spectral_m;
            const sample = {id: id, name: name,description: description, duration: duration, preview: preview, image: image}
            return { ...state, samples: [...state.samples, sample] };
        case REMOVE_FROM_LIBRARY:
            console.log(action.payload.id);
            return {
                ...state,
                samples: state.samples.filter(sample => sample.id !== action.payload.id)
            };
        case CHECK_IF_EXISTS:
            return state.filter((item) => item.id === action.payload.id);
        default:
            return state;
    }
}

export default freesoundReducer;
