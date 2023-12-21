import {
  CREATE_ROUTE,
  DefaultState,
  GET_ALL_PIERSES,
  GET_ALL_PIERSES_R,
  GET_ALL_ROUTES,
  GET_ALL_SIGHTS,
  GET_ALL_SIGHTS_R,
  routeTypes,
} from "@src/store/route/routeTypes";
import { stat } from "copy-webpack-plugin/types/utils";

const defaultState: DefaultState = {
  allSights: [],
  allPierses: [],
  allRoutes: [],
  isLoadingPierses: false,
  isLoadingSights: false,
};

export const routeReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case GET_ALL_SIGHTS:
      return { ...state, allSights: action.payload, isLoadingSights: false };
    case GET_ALL_ROUTES:
      return { ...state, allRoutes: action.payload };
    case GET_ALL_PIERSES:
      return { ...state, allPierses: action.payload, isLoadingPierses: false };
    case CREATE_ROUTE:
      return { ...state, allSights: [...state.allRoutes, action.payload] };
    case GET_ALL_PIERSES_R:
      return { ...state, isLoadingPierses: true };
    case GET_ALL_SIGHTS_R:
      return { ...state, isLoadingSights: true };
    default:
      return state;
  }
};
