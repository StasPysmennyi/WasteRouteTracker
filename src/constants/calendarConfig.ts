import { COLORS } from 'src/theme';

export const CALENDAR_THEME = {
  todayTextColor: COLORS.secondary,
  arrowColor: COLORS.primary,
  monthTextColor: COLORS.textPrimary,
  textDisabledColor: COLORS.textMuted,
  selectedDayBackgroundColor: COLORS.primary,
  selectedDayTextColor: COLORS.white,
  dotColor: COLORS.primary,
  selectedDotColor: COLORS.white,
} as const;
