import {applyMiddleware , combineReducers , createStore} from "redux";
import signUpReducer from "./signUp/signUpReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  signUp: signUpReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
