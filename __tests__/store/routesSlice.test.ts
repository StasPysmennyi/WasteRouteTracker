import routesReducer, {
  cacheRoutesForDate,
  setAvailableDates,
  setSelectedDate,
  setSelectedRouteId,
} from 'src/store/slices/routesSlice';

import type { RoutesState } from 'src/store/slices/routesSlice';

const initialState: RoutesState = {
  availableDates: [],
  routesByDate: {},
  selectedDate: null,
  selectedRouteId: null,
};

const mockRoute = {
  id: 'route-1',
  date: '2026-01-05',
  stops: [
    {
      order: 1,
      address: 'Test St 1, Jelgava',
      binCode: 'A',
      schedule: '1xxxxxx',
      frequency: '1xn',
      volume: 0.12,
      containers: 2,
    },
  ],
};

describe('routesSlice', () => {
  it('returns initial state', () => {
    expect(routesReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  describe('setAvailableDates', () => {
    it('sets available dates and selects the latest date', () => {
      const state = routesReducer(
        initialState,
        setAvailableDates(['2026-01-05', '2026-01-10']),
      );
      expect(state.availableDates).toEqual(['2026-01-05', '2026-01-10']);
      expect(state.selectedDate).toBe('2026-01-10');
    });

    it('does not override selectedDate if already set', () => {
      const stateWithDate: RoutesState = {
        ...initialState,
        selectedDate: '2026-01-10',
      };
      const state = routesReducer(
        stateWithDate,
        setAvailableDates(['2026-01-05']),
      );
      expect(state.selectedDate).toBe('2026-01-10');
    });

    it('leaves selectedDate null when dates array is empty', () => {
      const state = routesReducer(initialState, setAvailableDates([]));
      expect(state.selectedDate).toBeNull();
    });
  });

  describe('cacheRoutesForDate', () => {
    it('caches routes under the given date', () => {
      const state = routesReducer(
        initialState,
        cacheRoutesForDate({ date: '2026-01-05', routes: [mockRoute] }),
      );
      expect(state.routesByDate['2026-01-05']).toEqual([mockRoute]);
    });
  });

  describe('setSelectedDate', () => {
    it('updates selectedDate and clears selectedRouteId', () => {
      const stateWithRoute: RoutesState = {
        ...initialState,
        selectedDate: '2026-01-05',
        selectedRouteId: 'route-1',
      };
      const state = routesReducer(stateWithRoute, setSelectedDate('2026-01-06'));
      expect(state.selectedDate).toBe('2026-01-06');
      expect(state.selectedRouteId).toBeNull();
    });
  });

  describe('setSelectedRouteId', () => {
    it('sets selectedRouteId', () => {
      const state = routesReducer(initialState, setSelectedRouteId('route-1'));
      expect(state.selectedRouteId).toBe('route-1');
    });

    it('clears selectedRouteId when passed null', () => {
      const stateWithRoute: RoutesState = {
        ...initialState,
        selectedRouteId: 'route-1',
      };
      const state = routesReducer(stateWithRoute, setSelectedRouteId(null));
      expect(state.selectedRouteId).toBeNull();
    });
  });
});
