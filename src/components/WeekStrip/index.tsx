import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
} from 'src/components/Icons';
import { MonthCalendarModal } from 'src/components/MonthCalendarModal';

import { parseLocalDate } from 'src/utils';

import { DAY_LABELS, DAYS_ORDER } from 'src/constants';

import { styles } from './styles';

type Props = {
  weekDates: string[];
  selectedDate: string | null;
  availableDates: string[];
  onSelectDate: (date: string) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
};

const makeDayPressHandler =
  (hasData: boolean, date: string, onSelectDate: (date: string) => void) =>
  () => {
    if (hasData) {
      onSelectDate(date);
    }
  };

export const WeekStrip = ({
  weekDates,
  selectedDate,
  availableDates,
  onSelectDate,
  onPrevWeek,
  onNextWeek,
}: Props) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const availableSet = new Set(availableDates);

  const handleOpenCalendar = useCallback(() => {
    setIsCalendarVisible(true);
  }, []);

  const handleCloseCalendar = useCallback(() => {
    setIsCalendarVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={onPrevWeek} style={styles.navButton}>
        <ArrowLeftIcon width={20} height={20} />
      </Pressable>
      <View style={styles.daysRow}>
        {weekDates.map((date, index) => {
          const dayCode = DAYS_ORDER[index];
          const isSelected = date === selectedDate;
          const hasData = availableSet.has(date);
          return (
            <Pressable
              key={date}
              onPress={makeDayPressHandler(hasData, date, onSelectDate)}
              style={[
                styles.dayButton,
                isSelected && styles.dayButtonActive,
                !hasData && styles.dayButtonDisabled,
              ]}>
              <Text
                style={[styles.dayLabel, isSelected && styles.dayLabelActive]}>
                {DAY_LABELS[dayCode]}
              </Text>
              <Text
                style={[styles.dayDate, isSelected && styles.dayDateActive]}>
                {parseLocalDate(date).getDate()}
              </Text>
              {hasData && (
                <View style={[styles.dot, isSelected && styles.dotActive]} />
              )}
            </Pressable>
          );
        })}
      </View>
      <Pressable onPress={onNextWeek} style={styles.navButton}>
        <ArrowRightIcon width={20} height={20} />
      </Pressable>
      <Pressable onPress={handleOpenCalendar} style={styles.navButton}>
        <CalendarIcon width={20} height={20} />
      </Pressable>
      <MonthCalendarModal
        visible={isCalendarVisible}
        selectedDate={selectedDate}
        availableDates={availableDates}
        onSelectDate={onSelectDate}
        onClose={handleCloseCalendar}
      />
    </View>
  );
};
