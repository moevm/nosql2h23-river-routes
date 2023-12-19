import {
  GET_ALL_PIERSES,
  GET_ALL_ROUTES,
  GET_ALL_SIGHTS,
  GetAllPierses,
  GetAllRoutes,
  GetAllSights,
  Pierse,
  Route,
  Sight,
} from "@src/store/route/routeTypes";
import * as fs from "fs";
import routes from "@src/data/routes.json";

export const getAllSights = () => {
  return async (dispatch: any) => {
    const result: GetAllSights = {
      type: GET_ALL_SIGHTS,
      payload: [],
    };
    const response = await fetch("http://localhost:8081/sights")
      .then((res) => res.json())
      .then((_result) => {
        result.payload = _result;
      })
      .catch((e) => console.log(e));

    return dispatch(result);
  };
};

export const getAllPierses = () => {
  return async (dispatch: any) => {
    const result: GetAllPierses = {
      type: GET_ALL_PIERSES,
      payload: [],
    };
    const response = await fetch("//TODO")
      .then((res) => res.json())
      .then((_result) => {
        result.payload = _result;
      })
      .catch((e) => console.log(e));

    return dispatch(result);
  };
};

export const getAllRoutes = () => {
  return async (dispatch: any) => {
    const result: GetAllRoutes = {
      type: GET_ALL_ROUTES,
      payload: [],
    };
    const response = await fetch("//TODO")
      .then((res) => res.json())
      .then((_result) => {
        result.payload = _result;
      })
      .catch((e) => console.log(e));

    return dispatch(result);
  };
};

export const createRoute = (startPoint: Pierse, endPoint: Pierse, sights: Sight[]) => {
  fetch(
    `//TODO?startPoint=${JSON.stringify(startPoint)}&endPoint=${JSON.stringify(endPoint)}&sights=${JSON.stringify(
      sights,
    )}`,
  )
    .then((res) => res.json())
    .then((_result) => {
      const allRoutes: Route[] = JSON.parse(JSON.stringify(routes));
      // fs.appendFile("../../data/routes.json", JSON.stringify(allRoutes.concat(_result)), (e) => console.log(e));
    })
    .catch((e) => console.log(e));
};
