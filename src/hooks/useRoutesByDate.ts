import { useEffect, useMemo } from 'react';

import {
  cacheRoutesForDate,
  selectGeocodingCache,
  selectRoutesByDate,
} from 'src/store';

import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';

import { loadRouteChunk, mapRawRoutes } from 'src/utils';

import { type TYPES } from 'src/models';

export const useRoutesByDate = (date: string | null): TYPES.GeocodedRoute[] => {
  const dispatch = useAppDispatch();
  const routes = useAppSelector(state => selectRoutesByDate(state, date));
  const cache = useAppSelector(selectGeocodingCache);

  useEffect(() => {
    if (date && routes.length === 0) {
      const rawRoutes = loadRouteChunk(date);
      if (rawRoutes.length > 0) {
        dispatch(cacheRoutesForDate({ date, routes: mapRawRoutes(rawRoutes) }));
      }
    }
  }, [date, routes.length, dispatch]);

  return useMemo(
    () =>
      routes.map(route => ({
        ...route,
        geocodedStops: route.stops.map(stop => ({
          ...stop,
          coordinate: cache[stop.address] ?? undefined,
        })),
      })),
    [routes, cache],
  );
};
