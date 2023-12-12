import { DefaultState, GET_ALL_SIGHTS, routeTypes } from "@src/store/route/routeTypes";

const defaultState: DefaultState = {
  allSights: [],
};

export const routeReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case GET_ALL_SIGHTS:
      return { ...state, allSights: action.payload };
    default:
      return state;
  }
};
