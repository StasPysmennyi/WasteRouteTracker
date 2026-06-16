import { DAYS_ORDER } from 'src/constants';

export const parseSchedule = (schedule: string): string[] => {
  if (!schedule || schedule.length < 7) {
    return [];
  }
  return DAYS_ORDER.filter((day, index) => schedule[index] === day);
};

export const isScheduledOnDay = (
  schedule: string,
  dayCode: string,
): boolean => {
  const days = parseSchedule(schedule);
  return days.includes(dayCode);
};

export const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDate = (dateStr: string): string => {
  const d = parseLocalDate(dateStr);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const getDateDayCode = (dateStr: string): string => {
  const d = parseLocalDate(dateStr);
  const jsDay = d.getDay(); // 0=Sun, 1=Mon ... 6=Sat
  return jsDay === 0 ? '7' : String(jsDay);
};
