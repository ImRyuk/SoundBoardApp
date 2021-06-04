import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

import sampleReducer from "./library/sampleReducer";
import thunk from "redux-thunk";
import filterReducer from "./filter/filterReducer";

const persistConfig = {
    key: "brkp",
    storage: AsyncStorage,
    whitelist: ['samples'],
    blacklist: ['filter']
};

const rootReducer = combineReducers({
    samples: sampleReducer,
    filter: filterReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
