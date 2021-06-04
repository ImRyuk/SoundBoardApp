// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import sampleReducer from './library/sampleReducer';
import filterReducer from "./filter/filterReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
    sampleReducer: sampleReducer,
    filterReducer: filterReducer
});
// Exports
export default rootReducer;
