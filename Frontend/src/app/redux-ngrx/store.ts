import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";

// Single object containing all reducers:
const reducers = combineReducers({
    authState: authReducer
});

const store = createStore(reducers);

export default store;
