import { useCallback, useEffect, useMemo, useState } from 'react';

import { formatLocalDate, parseLocalDate } from 'src/utils';

const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const useWeekNavigation = (initialDate?: string) => {
  const [weekStart, setWeekStart] = useState<Date>(() => {
    const base = initialDate ? parseLocalDate(initialDate) : new Date();
    return getWeekStart(base);
  });

  useEffect(() => {
    if (!initialDate) {
      return;
    }
    setWeekStart(getWeekStart(parseLocalDate(initialDate)));
  }, [initialDate]);

  const weekDates = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        return formatLocalDate(d);
      }),
    [weekStart],
  );

  const goToPrevWeek = useCallback(() => {
    setWeekStart(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  }, []);

  const goToNextWeek = useCallback(() => {
    setWeekStart(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  }, []);

  return {
    weekDates,
    weekStart: formatLocalDate(weekStart),
    goToPrevWeek,
    goToNextWeek,
  };
};
