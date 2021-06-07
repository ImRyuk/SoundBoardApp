import {
    ADD_FREESOUND_TO_LIBRARY
    , CHECK_IF_EXISTS, EDIT, REMOVE_FREESOUND_FROM_LIBRARY,

} from './freesound/actions';
import {ADD_RECORD_TO_LIBRARY, REMOVE_RECORD_FROM_LIBRARY, PURGE} from "./recorded/actions";
import {TOGGLE_SAMPLE} from "../filter/actions";

const initialState = {
    samples: [
        {
            name: "Cymbal",
            type: "default",
            uri: "cymbal.wav",
            id: 1,
        },
        {
            name: "Daibyoshi",
            type: "default",
            uri: "daibyoshi.wav",
            id: 2,
        },
        {
            name: "Med_Taiko",
            type: "default",
            uri: "med_taiko.wav",
            id: 3,
        },
        {
            name: "Taiko",
            type: "default",
            uri: "taiko.wav",
            id: 4,
        },
        {
            name: "Tsuzumi",
            type: "default",
            uri: "tsuzumi.wav",
            id: 5,
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
            let freesoundUri = action.payload.previews['preview-lq-mp3'];
            const freesoundSample = {id: freesoundId, name: freesoundName,description: freesoundDescription, type: freesoundType,duration: freesoundDuration, uri: freesoundUri}
            return { ...state, samples: [...state.samples, freesoundSample] };
        case ADD_RECORD_TO_LIBRARY:
            console.log(action);
            let recordedId = action.payload.id;
            let recordedName = action.payload.name;
            let recordedType = 'recorded';
            let recordedUri = action.payload.uri;
            const recordedSample = {id: recordedId, name: recordedName, type: recordedType, uri: recordedUri}
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
        case PURGE:
            console.log("Clearing store...");
            return initialState;
        default:
            return state;
    }
}

export const filteredSamplesSelector = (state) => {
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
