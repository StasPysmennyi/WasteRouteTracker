import type { FeatureCollection, LineString, Point } from 'geojson';

// Stable module-level constants — fixed references prevent MapLibre from
// re-validating source data on every render for inactive slots.
export const EMPTY_LINE_GEOJSON = JSON.stringify({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [0, 0],
          [0, 0.0001],
        ],
      },
      properties: {},
    },
  ],
});

export const EMPTY_POINTS_GEOJSON = JSON.stringify({
  type: 'FeatureCollection',
  features: [],
});

import { type TYPES } from 'src/models';

export const toGeoJSON = (
  stops: TYPES.GeocodedStop[],
  routeId: string,
  color: string,
): FeatureCollection<Point> => ({
  type: 'FeatureCollection',
  features: stops
    .filter(stop => stop.coordinate)
    .sort((stopA, stopB) => stopA.order - stopB.order)
    .map(stop => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [stop.coordinate!.longitude, stop.coordinate!.latitude],
      },
      properties: {
        order: stop.order,
        address: stop.address,
        containers: stop.containers,
        volume: stop.volume,
        routeId,
        color,
      },
    })),
});

// Always returns a FeatureCollection (possibly empty) rather than a
// nullable Feature, so callers can keep the polyline's GeoJSONSource/Layer
// permanently mounted instead of conditionally rendering it — toggling a
// Layer's presence is a known crash source on React Native's New Architecture.
export const toPolyline = (
  stops: TYPES.GeocodedStop[],
): FeatureCollection<LineString> => {
  const sortedCoords = stops
    .filter(stop => stop.coordinate)
    .sort((stopA, stopB) => stopA.order - stopB.order)
    .map(stop => [stop.coordinate!.longitude, stop.coordinate!.latitude]);

  // Consecutive stops at the same building (different tenants) share a
  // coordinate — repeated points produce zero-length segments that
  // MapLibre's native line layer logs as invalid geometry and can crash on.
  const coords = sortedCoords.filter(
    (coord, idx) =>
      idx === 0 ||
      coord[0] !== sortedCoords[idx - 1][0] ||
      coord[1] !== sortedCoords[idx - 1][1],
  );

  return {
    type: 'FeatureCollection',
    features:
      coords.length < 2
        ? []
        : [
            {
              type: 'Feature',
              geometry: { type: 'LineString', coordinates: coords },
              properties: {},
            },
          ],
  };
};

export type RouteTotals = {
  totalGeocoded: number;
  totalStops: number;
  totalContainers: number;
  totalVolume: number;
};

export const calculateRouteTotals = (
  routes: TYPES.GeocodedRoute[],
): RouteTotals =>
  routes.reduce(
    (totals, route) => ({
      totalGeocoded:
        totals.totalGeocoded +
        route.geocodedStops.filter(stop => stop.coordinate).length,
      totalStops: totals.totalStops + route.geocodedStops.length,
      totalContainers:
        totals.totalContainers +
        route.geocodedStops.reduce((sum, stop) => sum + stop.containers, 0),
      totalVolume:
        totals.totalVolume +
        route.geocodedStops.reduce(
          (sum, stop) => sum + stop.volume * stop.containers,
          0,
        ),
    }),
    { totalGeocoded: 0, totalStops: 0, totalContainers: 0, totalVolume: 0 },
  );
