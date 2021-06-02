import {
    ADD_TO_LIBRARY
    , CHECK_IF_EXISTS, EDIT, REMOVE_FROM_LIBRARY,

} from './freesound/actions';

const initialState = {
    samples: [
        {
            name: "cat mew",
            type: "default",
            url: "file://",
            id: 1,
        },
        {
            name: "dog mew",
            type: "default",
            url: "file://fioerfhjeroifheroi",
            id: 2,
        },
    ]
};

const sampleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_LIBRARY:
            console.log(action);
            let id = action.payload.id;
            let name = action.payload.name;
            let type = 'freesound';
            let description = action.payload.description;
            let duration = action.payload.duration;
            let url = action.payload.previews['preview-lq-mp3'];
            const sample = {id: id, name: name,description: description, type: type,duration: duration, url: url}
            return { ...state, samples: [...state.samples, sample] };
        case REMOVE_FROM_LIBRARY:
            console.log(action.payload.id);
            return {
                ...state,
                samples: state.samples.filter(sample => sample.id !== action.payload.id)
            };
        case EDIT:
            return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, ...action.payload.object }
                    : item
            );
        case CHECK_IF_EXISTS:
            return state.filter((item) => item.id === action.payload.id);
        default:
            return state;
    }
}

export default sampleReducer;
