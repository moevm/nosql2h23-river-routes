export const GET_ALL_ROUTES = "GET_ALL_ROUTES";

export const GET_ALL_SIGHTS = "GET_ALL_SIGHTS";

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
}

export interface GetAllSights {
  type: typeof GET_ALL_SIGHTS;
  payload: Sight[];
}

export type routeTypes = GetAllSights | DefaultState;
