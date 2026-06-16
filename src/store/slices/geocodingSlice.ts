import { createSlice } from '@reduxjs/toolkit';
import geocodingCacheJson from 'src/assets/data/geocodingCache.json';

import { type TYPES } from 'src/models';

export type GeocodingState = {
  cache: Record<string, TYPES.Coordinate | null>;
};

const initialState: GeocodingState = {
  cache: geocodingCacheJson as Record<string, TYPES.Coordinate | null>,
};

const geocodingSlice = createSlice({
  name: 'geocoding',
  initialState,
  reducers: {},
});

export default geocodingSlice.reducer;
