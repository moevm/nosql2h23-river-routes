import {
  CREATE_ROUTE,
  CreateRoute,
  GET_ALL_PIERSES,
  GET_ALL_ROUTES,
  GET_ALL_SIGHTS,
  GetAllPierses,
  GetAllRoutes,
  GetAllSights,
  Pierse,
  Route,
  SAVE_NEW_ROUTES,
  SaveRoutes,
  Sight,
} from "@src/store/route/routeTypes";

export const getAllSights = () => {
  return (dispatch: any) => {
    const result: GetAllSights = {
      type: GET_ALL_SIGHTS,
      payload: [],
    };
    fetch("http://localhost:8081/sights")
      .then((res) => res.json())
      .then((_result) => {
        result.payload = _result;
        return dispatch(result);
      })
      .catch((e) => console.log(e));
  };
};

export const getAllPierses = () => {
  return (dispatch: any) => {
    const result: GetAllPierses = {
      type: GET_ALL_PIERSES,
      payload: [],
    };
    fetch("http://localhost:8081/piers")
      .then((res) => res.json())
      .then((_result) => {
        result.payload = _result;
        return dispatch(result);
      })
      .catch((e) => console.log(e));
  };
};

export const getAllRoutes = () => {
  return (dispatch: any) => {
    const result: GetAllRoutes = {
      type: GET_ALL_ROUTES,
      payload: [],
    };
    fetch("http://localhost:8081/routes")
      .then((res) => res.json())
      .then((_result) => {
        result.payload = _result;
        // console.log(_result);
        return dispatch(result);
      })
      .catch((e) => console.log(e));
  };
};

export const createRoute =
  (startPoint: Pierse, endPoint: Pierse, sights: Sight[], title: string) => (dispatch: any) => {
    const result: CreateRoute = {
      type: CREATE_ROUTE,
      payload: null,
    };
    fetch("http://localhost:8081/path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startPoint: startPoint,
        endPoint: endPoint,
        sights: sights,
        name: title,
      }),
    })
      .then((res) => res.json())
      .then((_result) => {
        // console.log(_result);
        result.payload = _result;
        return dispatch(result);
      })
      .catch((e) => console.log(e));
  };

export const importRoutes = (newRoutes: Route[]) => (dispatch: any) => {
  const result: SaveRoutes = {
    type: SAVE_NEW_ROUTES,
    payload: null,
  };
  fetch("http://localhost:8081/routes/import", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      routes: [...newRoutes],
    }),
  })
    .then((res) => res.json())
    .then((_result) => {
      // console.log(_result);
      result.payload = _result;
      return dispatch(result);
    })
    .catch((e) => console.log(e));
};
