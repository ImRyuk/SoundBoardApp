// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import sampleReducer from './sampleReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
    freesoundReducer: sampleReducer
});
// Exports
export default rootReducer;
