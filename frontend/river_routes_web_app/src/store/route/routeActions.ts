import {
  CREATE_ROUTE,
  CreateRoute,
  GET_ALL_PIERSES,
  GET_ALL_PIERSES_R,
  GET_ALL_SIGHTS,
  GET_ALL_SIGHTS_R,
  GetAllPierses,
  GetAllSights,
  Pierse,
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
    fetch("//TODO")
      .then((res) => res.json())
      .then((_result) => {
        result.payload = _result;
        return dispatch(result);
      })
      .catch((e) => console.log(e));
  };
};

// export const getAllRoutes = () => {
//   return async (dispatch: any) => {
//     const result: GetAllRoutes = {
//       type: GET_ALL_ROUTES,
//       payload: [],
//     };
//     const response = await fetch("//TODO")
//       .then((res) => res.json())
//       .then((_result) => {
//         result.payload = _result;
//       })
//       .catch((e) => console.log(e));
//
//     return dispatch(result);
//   };
// };

export const createRoute = (startPoint: Pierse, endPoint: Pierse, sights: Sight[]) => (dispatch: any) => {
  const result: CreateRoute = {
    type: CREATE_ROUTE,
    payload: null,
  };
  fetch("https://example.com/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startPoint: startPoint,
      endPoint: endPoint,
      sights: sights,
    }),
  })
    .then((res) => res.json())
    .then((_result) => {
      result.payload = _result;
    })
    .catch((e) => console.log(e));

  return dispatch(result);
};
