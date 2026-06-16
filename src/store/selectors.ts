import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from './store';

export const selectAvailableDates = (state: RootState) =>
  state.routes.availableDates;
export const selectSelectedDate = (state: RootState) =>
  state.routes.selectedDate;
export const selectSelectedRouteId = (state: RootState) =>
  state.routes.selectedRouteId;
export const selectGeocodingCache = (state: RootState) => state.geocoding.cache;

export const selectRoutesByDate = createSelector(
  (state: RootState) => state.routes.routesByDate,
  (_: RootState, date: string | null) => date,
  (routesByDate, date) => (date ? (routesByDate[date] ?? []) : []),
);

export const selectSelectedRoute = createSelector(
  (state: RootState) => state.routes.routesByDate,
  selectSelectedDate,
  selectSelectedRouteId,
  (routesByDate, selectedDate, selectedRouteId) => {
    if (!selectedDate || !selectedRouteId) {
      return null;
    }
    const routes = routesByDate[selectedDate] ?? [];
    return routes.find(route => route.id === selectedRouteId) ?? null;
  },
);
