// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import freesoundReducer from './freesound/freesoundReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
    freesoundReducer: freesoundReducer
});
// Exports
export default rootReducer;
