import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducers";

const rootReducer = combineReducers({
  user: userReducer,
});

const preloadState = {
  user: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

// update compose()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  preloadState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
