import { Text, View } from 'react-native';

import { styles } from './styles';

type Props = {
  routeCount: number;
  totalStops: number;
  geocodedCount: number;
  totalContainers: number;
  totalVolume: number;
};

export const RouteSummaryBar = ({
  routeCount,
  totalStops,
  geocodedCount,
  totalContainers,
  totalVolume,
}: Props) => (
  <View style={styles.container}>
    <View style={styles.item}>
      <Text style={styles.value}>{routeCount}</Text>
      <Text style={styles.label}>Routes</Text>
    </View>
    <View style={styles.item}>
      <Text style={styles.value}>{totalStops}</Text>
      <Text style={styles.label}>Stops</Text>
    </View>
    <View style={styles.item}>
      <Text style={styles.value}>
        {geocodedCount}/{totalStops}
      </Text>
      <Text style={styles.label}>Mapped</Text>
    </View>
    <View style={styles.item}>
      <Text style={styles.value}>{totalContainers}</Text>
      <Text style={styles.label}>Bins</Text>
    </View>
    <View style={styles.item}>
      <Text style={styles.value}>{totalVolume.toFixed(1)}</Text>
      <Text style={styles.label}>m³</Text>
    </View>
  </View>
);
