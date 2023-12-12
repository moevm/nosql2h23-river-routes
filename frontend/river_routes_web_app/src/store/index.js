import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { routeReducer } from "@src/store/route/routeReducer";

const rootReducer = combineReducers({
  route: routeReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
