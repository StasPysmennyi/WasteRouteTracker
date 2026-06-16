import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { type TYPES } from 'src/models';

import { styles } from './styles';

type Props = {
  route: TYPES.GeocodedRoute;
  routeColor: string;
  geocodedCount: number;
  isSelected: boolean;
  onPress: () => void;
};

const RouteCardComponent = ({
  route,
  routeColor,
  geocodedCount,
  isSelected,
  onPress,
}: Props) => {
  const totalVolume = route.geocodedStops.reduce(
    (sum, stop) => sum + stop.volume * stop.containers,
    0,
  );
  const totalContainers = route.geocodedStops.reduce(
    (sum, stop) => sum + stop.containers,
    0,
  );
  const totalStops = route.geocodedStops.length;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        isSelected && styles.containerSelected,
        styles.containerBorder,
        { borderLeftColor: routeColor },
      ]}>
      <View style={styles.header}>
        <Text style={styles.routeId}>{route.id}</Text>
        <View style={styles.geocodeStatus}>
          <Text style={styles.geocodeText}>
            {geocodedCount}/{totalStops}
          </Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{totalStops}</Text>
          <Text style={styles.statLabel}>Stops</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{totalContainers}</Text>
          <Text style={styles.statLabel}>Bins</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{totalVolume.toFixed(2)}</Text>
          <Text style={styles.statLabel}>m³</Text>
        </View>
      </View>
    </Pressable>
  );
};

export const RouteCard = memo(RouteCardComponent);
