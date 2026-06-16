import { ScrollView, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import routesStats from 'src/assets/data/routesStats.json';

import { StatsCard } from 'src/components';

import { DayBarChart, TopAddressItem } from './components';
import { styles } from './styles';

const OVERVIEW_STATS = [
  { label: 'Routes', value: routesStats.totalRoutes },
  { label: 'Days', value: routesStats.totalDates },
  { label: 'Stops', value: routesStats.totalStops },
  { label: 'Bins', value: routesStats.totalContainers },
  { label: 'Volume m³', value: routesStats.totalVolume.toFixed(1) },
  { label: 'Addresses', value: routesStats.uniqueAddresses },
];

export const StatsScreen = () => (
  <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.statsGrid}>
        {OVERVIEW_STATS.map(item => (
          <StatsCard key={item.label} label={item.label} value={item.value} />
        ))}
      </View>
      <Text style={styles.dateRange}>{routesStats.dateRange}</Text>

      <Text style={styles.sectionTitle}>Stops by Day of Week</Text>
      <DayBarChart
        stopsByDay={routesStats.stopsByDay}
        maxDayStops={routesStats.maxDayStops}
      />

      <Text style={styles.sectionTitle}>Top 5 Addresses</Text>
      {routesStats.topAddresses.map((item, index) => (
        <TopAddressItem
          key={item.address}
          address={item.address}
          containerCount={item.count}
          rank={index + 1}
        />
      ))}
    </ScrollView>
  </SafeAreaView>
);
