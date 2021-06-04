import {
    ADD_FREESOUND_TO_LIBRARY,
    ADD_TO_LIBRARY
    , CHECK_IF_EXISTS, EDIT, REMOVE_FREESOUND_FROM_LIBRARY, REMOVE_FROM_LIBRARY,

} from './freesound/actions';
import {ADD_RECORD_TO_LIBRARY, REMOVE_RECORD_FROM_LIBRARY} from "./recorded/actions";
import {TOGGLE_SAMPLE} from "./actions";

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
        case REMOVE_RECORD_FROM_LIBRARY:
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
        case TOGGLE_SAMPLE:
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, type: !item.type }
                    : item
            );
        default:
            return state;
    }
}

export const filteredSamplesSelector = (state) => {
    console.log(state.samples)
    switch (state.filter) {
        case "all":
            return state.samples.samples;
        case "default":
            return state.samples.samples.filter((item) => item.type==='default');
        case "recorded":
            return state.samples.samples.filter((item) => item.type==='recorded');
        case "freesound":
            return state.samples.samples.filter((item) => item.type==='freesound');
    }
};

export default sampleReducer;
