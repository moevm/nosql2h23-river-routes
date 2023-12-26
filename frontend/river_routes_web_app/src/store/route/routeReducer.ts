import {
  CREATE_ROUTE,
  CREATE_ROUTE_R,
  DefaultState,
  GET_ALL_PIERSES,
  GET_ALL_PIERSES_R,
  GET_ALL_ROUTES,
  GET_ALL_ROUTES_R,
  GET_ALL_SIGHTS,
  GET_ALL_SIGHTS_R,
  routeTypes,
  SAVE_NEW_ROUTES,
  SAVE_NEW_ROUTES_R,
} from "@src/store/route/routeTypes";
import { stat } from "copy-webpack-plugin/types/utils";

const defaultState: DefaultState = {
  allSights: [],
  allPierses: [],
  allRoutes: [],
  isLoadingPierses: false,
  isLoadingSights: false,
  isLoadingRoutes: false,
  isLoading: false,
  saveProceeding: false,
  newId: 0,
};

export const routeReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case GET_ALL_SIGHTS:
      return { ...state, allSights: action.payload, isLoadingSights: false };
    case GET_ALL_ROUTES:
      return { ...state, allRoutes: action.payload, isLoadingRoutes: false };
    case GET_ALL_PIERSES:
      return { ...state, allPierses: action.payload, isLoadingPierses: false };
    case CREATE_ROUTE:
      return { ...state, newId: action.payload.id, allRoutes: [...state.allRoutes, action.payload], isLoading: false };
    case GET_ALL_PIERSES_R:
      return { ...state, isLoadingPierses: true };
    case GET_ALL_SIGHTS_R:
      return { ...state, isLoadingSights: true };
    case CREATE_ROUTE_R:
      return { ...state, isLoading: true };
    case GET_ALL_ROUTES_R:
      return { ...state, isLoadingRoutes: true };
    case SAVE_NEW_ROUTES_R:
      return { ...state, saveProceeding: true };
    case SAVE_NEW_ROUTES:
      return { ...state, allRoutes: action.payload, saveProceeding: false };
    default:
      return state;
  }
};
