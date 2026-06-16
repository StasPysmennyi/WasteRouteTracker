import { Text, View } from 'react-native';

import { styles } from './styles';

type Props = {
  selectedDate: string | null;
  routeCount: number;
  totalStops: number;
  totalContainers: number;
};

export const DateHeader = ({
  selectedDate,
  routeCount,
  totalStops,
  totalContainers,
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.date}>{selectedDate ?? 'No date selected'}</Text>
    <Text style={styles.sub}>
      {routeCount} routes · {totalStops} stops · {totalContainers} bins
    </Text>
  </View>
);
