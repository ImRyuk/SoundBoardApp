import {
    ADD_FREESOUND_TO_LIBRARY,
    ADD_TO_LIBRARY
    , CHECK_IF_EXISTS, EDIT, REMOVE_FREESOUND_FROM_LIBRARY, REMOVE_FROM_LIBRARY,

} from './freesound/actions';
import {ADD_RECORD_TO_LIBRARY} from "./recorded/actions";

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
        case ADD_FREESOUND_TO_LIBRARY:
            console.log(action);
            let freesoundId = action.payload.id;
            let freesoundName = action.payload.name;
            let freesoundType = 'freesound';
            let freesoundDescription = action.payload.description;
            let freesoundDuration = action.payload.duration;
            let freesoundUrl = action.payload.previews['preview-lq-mp3'];
            const freesoundSample = {id: freesoundId, name: freesoundName,description: freesoundDescription, type: freesoundType,duration: freesoundDuration, url: freesoundUrl}
            return { ...state, samples: [...state.samples, freesoundSample] };
        case ADD_RECORD_TO_LIBRARY:
            console.log(action);
            let recordedId = action.payload.id;
            let recordedName = action.payload.name;
            let recordedType = 'recorded';
            let recordedUrl = action.payload.url;
            const recordedSample = {id: recordedId, name: recordedName, type: recordedType, url: recordedUrl}
            return { ...state, samples: [...state.samples, recordedSample] };
        case REMOVE_FREESOUND_FROM_LIBRARY:
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
