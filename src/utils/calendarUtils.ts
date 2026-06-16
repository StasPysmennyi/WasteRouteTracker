import type { MarkedDates } from 'react-native-calendars/src/types';

import { COLORS } from 'src/constants';

import { formatLocalDate, parseLocalDate } from './scheduleUtils';

const buildDateRange = (start: Date, end: Date): string[] => {
  const dayCount =
    Math.round((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1;
  return Array.from({ length: dayCount }, (_, i) => {
    const d = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + i,
    );
    return formatLocalDate(d);
  });
};

export const buildMarkedDates = (
  availableDates: string[],
  selectedDate: string | null,
): MarkedDates => {
  if (availableDates.length === 0) {
    return {};
  }

  const availableSet = new Set(availableDates);
  const start = parseLocalDate(availableDates[0]);
  const end = parseLocalDate(availableDates[availableDates.length - 1]);

  const marked: MarkedDates = {};
  for (const dateStr of buildDateRange(start, end)) {
    const hasData = availableSet.has(dateStr);
    marked[dateStr] = {
      disabled: !hasData,
      disableTouchEvent: !hasData,
      marked: hasData,
      dotColor: COLORS.primary,
    };
  }

  if (selectedDate && marked[selectedDate]) {
    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor: COLORS.primary,
      selectedTextColor: COLORS.white,
    };
  }

  return marked;
};
