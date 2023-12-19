import {
  CREATE_ROUTE,
  DefaultState,
  GET_ALL_PIERSES,
  GET_ALL_ROUTES,
  GET_ALL_SIGHTS,
  routeTypes,
} from "@src/store/route/routeTypes";

const defaultState: DefaultState = {
  allSights: [],
  allPierses: [],
  allRoutes: [],
};

export const routeReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case GET_ALL_SIGHTS:
      return { ...state, allSights: action.payload };
    case GET_ALL_ROUTES:
      return { ...state, allRoutes: action.payload };
    case GET_ALL_PIERSES:
      return { ...state, allPierses: action.payload };
    case CREATE_ROUTE:
      return { ...state, allSights: [...state.allRoutes, action.payload] };
    default:
      return state;
  }
};
