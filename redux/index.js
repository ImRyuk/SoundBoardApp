// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import sampleReducer from './library/sampleReducer';
import filterReducer from "./filter/filterReducer";
import padReducer from "./pads/padReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
    sampleReducer: sampleReducer,
    filterReducer: filterReducer,
    pads: padReducer
});
// Exports
export default rootReducer;
