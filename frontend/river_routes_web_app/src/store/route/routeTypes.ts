export const GET_ALL_ROUTES = "GET_ALL_ROUTES";

export const GET_ALL_SIGHTS = "GET_ALL_SIGHTS";

export const GET_ALL_PIERSES = "GET_ALL_PIERSES";

export const CREATE_ROUTE = "CREATE_ROUTE";

export interface Sight {
  id: number;
  title: string;
  lat: number;
  lon: number;
  wikiLink: string;
  updatedAt: any;
}

export interface WaterNode {
  id: number;
  lat: number;
  lon: number;
}

export interface Route {
  id: number;
  name: string;
  startLat: number;
  startLon: number;
  endLat: number;
  endLon: number;
  createAt: Date;
  sights: Sight[];
  waterNodes: WaterNode[];
}

export interface Pierse {
  id: number;
  lat: number;
  lon: number;
  waterNodes: WaterNode[];
}

export interface DefaultState {
  allSights: Sight[];
  allPierses: Pierse[];
  allRoutes: Route[];
}

export interface GetAllSights {
  type: typeof GET_ALL_SIGHTS;
  payload: Sight[];
}

export interface GetAllPierses {
  type: typeof GET_ALL_PIERSES;
  payload: Pierse[];
}

export interface GetAllRoutes {
  type: typeof GET_ALL_ROUTES;
  payload: Route[];
}

export interface CreateRoute {
  type: typeof CREATE_ROUTE;
  payload: Route[];
}

export type routeTypes = GetAllSights | DefaultState | GetAllPierses | CreateRoute;
