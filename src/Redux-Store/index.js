import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//REDUCERS IMPORTS
import { userReducer } from "./_Users/reducers";
import { tokenReducer } from "./Token/reducers";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  userState: userReducer,
  tokenState: tokenReducer,
});

export const storeConfig = createStore(
  rootReducer,
  composedEnhancer(applyMiddleware(thunk))
);
