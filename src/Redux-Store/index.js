import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//REDUCERS IMPORTS
import { userReducer } from "./_Users/reducers";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  userState: userReducer,
});

export const storeConfig = createStore(
  rootReducer,
  composedEnhancer(applyMiddleware(thunk))
);
