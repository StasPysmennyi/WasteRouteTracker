import { useCallback, useMemo } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { Calendar, type DateData } from 'react-native-calendars';

import { buildMarkedDates } from 'src/utils';

import { CALENDAR_THEME } from 'src/constants';

import { styles } from './styles';

type Props = {
  visible: boolean;
  selectedDate: string | null;
  availableDates: string[];
  onSelectDate: (date: string) => void;
  onClose: () => void;
};

export const MonthCalendarModal = ({
  visible,
  selectedDate,
  availableDates,
  onSelectDate,
  onClose,
}: Props) => {
  const markedDates = useMemo(
    () => buildMarkedDates(availableDates, selectedDate),
    [availableDates, selectedDate],
  );

  const handleDayPress = useCallback(
    (date: DateData) => {
      onSelectDate(date.dateString);
      onClose();
    },
    [onSelectDate, onClose],
  );

  const handleSheetPress = useCallback(() => {}, []);

  const [firstAvailableDate] = availableDates;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={handleSheetPress}>
          <View style={styles.header}>
            <Text style={styles.title}>Select date</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>
          <Calendar
            current={selectedDate ?? firstAvailableDate}
            minDate={firstAvailableDate}
            maxDate={availableDates[availableDates.length - 1]}
            markedDates={markedDates}
            onDayPress={handleDayPress}
            theme={CALENDAR_THEME}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};
