import { Text, View } from 'react-native';

import {
  DAY_LABELS,
  DAYS_ORDER,
  ROUTE_COLORS,
  STATS_CHART,
} from 'src/constants';

import { styles } from './styles';

type Props = {
  stopsByDay: Record<string, number>;
  maxDayStops: number;
};

export const DayBarChart = ({ stopsByDay, maxDayStops }: Props) => (
  <View style={styles.container}>
    {DAYS_ORDER.map(day => {
      const count = stopsByDay[day] ?? 0;
      const barHeight =
        maxDayStops > 0 ? (count / maxDayStops) * STATS_CHART.trackHeight : 0;

      return (
        <View key={day} style={styles.barWrapper}>
          <Text style={styles.barValue}>{count}</Text>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.bar,
                {
                  height: barHeight,
                  backgroundColor:
                    ROUTE_COLORS[Number(day) % ROUTE_COLORS.length],
                },
              ]}
            />
          </View>
          <Text style={styles.barLabel}>{DAY_LABELS[day]}</Text>
        </View>
      );
    })}
  </View>
);
