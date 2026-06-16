import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type TYPES } from 'src/models';

export type RoutesState = {
  availableDates: string[];
  routesByDate: Record<string, TYPES.Route[]>;
  selectedDate: string | null;
  selectedRouteId: string | null;
};

const initialState: RoutesState = {
  availableDates: [],
  routesByDate: {},
  selectedDate: null,
  selectedRouteId: null,
};

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setAvailableDates: (state, action: PayloadAction<string[]>) => {
      state.availableDates = action.payload;
      if (action.payload.length > 0 && !state.selectedDate) {
        state.selectedDate = action.payload[action.payload.length - 1];
      }
    },
    cacheRoutesForDate: (
      state,
      action: PayloadAction<{ date: string; routes: TYPES.Route[] }>,
    ) => {
      state.routesByDate[action.payload.date] = action.payload.routes;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
      state.selectedRouteId = null;
    },
    setSelectedRouteId: (state, action: PayloadAction<string | null>) => {
      state.selectedRouteId = action.payload;
    },
  },
});

export const {
  cacheRoutesForDate,
  setAvailableDates,
  setSelectedDate,
  setSelectedRouteId,
} = routesSlice.actions;

export default routesSlice.reducer;
