export const GET_ALL_ROUTES = "GET_ALL_ROUTES";

export const GET_ALL_SIGHTS = "GET_ALL_SIGHTS";

export const GET_ALL_PIERSES = "GET_ALL_PIERSES";

export const CREATE_ROUTE = "CREATE_ROUTE";

export const GET_ALL_SIGHTS_R = "GET_ALL_SIGHTS_R";

export const GET_ALL_PIERSES_R = "GET_ALL_PIERSES_R";

export const CREATE_ROUTE_R = "CREATE_ROUTE_R";

export const GET_ALL_ROUTES_R = "GET_ALL_ROUTES_R";

export const SAVE_NEW_ROUTES_R = "SAVE_NEW_ROUTES_R";

export const SAVE_NEW_ROUTES = "SAVE_NEW_ROUTES";

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
  // startLat: number;
  // startLon: number;
  // endLat: number;
  // endLon: number;
  startPoint: Pierse;
  endPoint: Pierse;
  createAt: Date;
  sights: Sight[];
  waterNodes: WaterNode[];
}

export interface RouteForRequest {
  name: string;
  startPoint: Pierse;
  endPoint: Pierse;
  sights: Sight[];
}

export interface Pierse {
  id: number;
  lat: number;
  lon: number;
  address: string;
  waterNodes: WaterNode[];
}

export interface DefaultState {
  allSights: Sight[];
  allPierses: Pierse[];
  allRoutes: Route[];
  isLoadingPierses: boolean;
  isLoadingSights: boolean;
  isLoadingRoutes: boolean;
  isLoading: boolean;
  saveProceeding: boolean;
  newId: number;
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
  payload: number;
}

export interface SaveRoutes {
  type: typeof SAVE_NEW_ROUTES;
  payload: Route[];
}

export type routeTypes = GetAllSights | DefaultState | GetAllPierses | CreateRoute;
