import { type Coordinate } from './coordinateTypes';

export type RouteStop = {
  order: number;
  address: string;
  binCode: string;
  schedule: string;
  frequency: string;
  volume: number;
  containers: number;
};

export type Route = {
  id: string;
  date: string;
  stops: RouteStop[];
};

export type GeocodedStop = RouteStop & {
  coordinate?: Coordinate;
};

export type GeocodedRoute = Omit<Route, 'stops'> & {
  geocodedStops: GeocodedStop[];
};
