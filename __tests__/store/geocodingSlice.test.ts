import geocodingReducer from 'src/store/slices/geocodingSlice';

describe('geocodingSlice', () => {
  it('returns initial state with preloaded cache', () => {
    const state = geocodingReducer(undefined, { type: '@@INIT' });
    expect(state).toHaveProperty('cache');
    expect(typeof state.cache).toBe('object');
  });

  it('cache values are coordinates or null', () => {
    const state = geocodingReducer(undefined, { type: '@@INIT' });
    const values = Object.values(state.cache).slice(0, 10);
    values.forEach(value => {
      if (value !== null) {
        expect(value).toHaveProperty('latitude');
        expect(value).toHaveProperty('longitude');
        expect(Number.isFinite(value.latitude)).toBe(true);
        expect(Number.isFinite(value.longitude)).toBe(true);
      }
    });
  });
});
