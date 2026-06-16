import { useCallback } from 'react';

import {
  selectAvailableDates,
  selectSelectedDate,
  setSelectedDate,
  setSelectedRouteId,
} from 'src/store';

import {
  useAppDispatch,
  useAppSelector,
  useRoutesByDate,
  useWeekNavigation,
} from 'src/hooks';

export const useScreenRoutes = () => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(selectSelectedDate);
  const availableDates = useAppSelector(selectAvailableDates);

  const { weekDates, goToPrevWeek, goToNextWeek } = useWeekNavigation(
    selectedDate ?? availableDates[0],
  );

  const routes = useRoutesByDate(selectedDate);

  const handleSelectDate = useCallback(
    (date: string) => {
      dispatch(setSelectedDate(date));
      dispatch(setSelectedRouteId(null));
    },
    [dispatch],
  );

  return {
    routes,
    selectedDate,
    availableDates,
    weekDates,
    goToPrevWeek,
    goToNextWeek,
    handleSelectDate,
  };
};
