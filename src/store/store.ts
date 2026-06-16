import { configureStore } from '@reduxjs/toolkit';

import geocodingReducer from './slices/geocodingSlice';
import routesReducer from './slices/routesSlice';

export const store = configureStore({
  reducer: {
    routes: routesReducer,
    geocoding: geocodingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
