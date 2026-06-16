import { useCallback } from 'react';
import { FlatList, type ListRenderItem, Text, View } from 'react-native';

import { type BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RouteCard, WeekStrip } from 'src/components';

import { selectSelectedRouteId, setSelectedRouteId } from 'src/store';

import { useAppDispatch, useAppSelector, useScreenRoutes } from 'src/hooks';

import { ROUTE_COLORS } from 'src/constants';

import { ENUMS, type TYPES } from 'src/models';

import { DateHeader } from './components';
import { styles } from './styles';

type RoutesNavProp = BottomTabNavigationProp<
  TYPES.TabParamList,
  typeof ENUMS.TabNames.ROUTES
>;

export const RoutesScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RoutesNavProp>();
  const selectedRouteId = useAppSelector(selectSelectedRouteId);

  const {
    routes,
    selectedDate,
    availableDates,
    weekDates,
    goToPrevWeek,
    goToNextWeek,
    handleSelectDate,
  } = useScreenRoutes();

  const totalStops = routes.reduce(
    (sum, route) => sum + route.geocodedStops.length,
    0,
  );
  const totalContainers = routes.reduce(
    (sum, route) =>
      sum +
      route.geocodedStops.reduce(
        (stopSum, stop) => stopSum + stop.containers,
        0,
      ),
    0,
  );

  const handleRoutePress = useCallback(
    (routeId: string) => {
      dispatch(setSelectedRouteId(routeId));
      navigation.navigate(ENUMS.TabNames.MAP);
    },
    [dispatch, navigation],
  );

  const renderItem: ListRenderItem<TYPES.GeocodedRoute> = useCallback(
    ({ item, index }) => {
      const geocodedCount = item.geocodedStops.filter(
        stop => stop.coordinate,
      ).length;
      return (
        <RouteCard
          route={item}
          routeColor={ROUTE_COLORS[index % ROUTE_COLORS.length]}
          geocodedCount={geocodedCount}
          isSelected={item.id === selectedRouteId}
          onPress={() => handleRoutePress(item.id)}
        />
      );
    },
    [selectedRouteId, handleRoutePress],
  );

  const ListHeader = useCallback(
    () => (
      <DateHeader
        selectedDate={selectedDate}
        routeCount={routes.length}
        totalStops={totalStops}
        totalContainers={totalContainers}
      />
    ),
    [selectedDate, routes.length, totalStops, totalContainers],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <WeekStrip
        weekDates={weekDates}
        selectedDate={selectedDate}
        availableDates={availableDates}
        onSelectDate={handleSelectDate}
        onPrevWeek={goToPrevWeek}
        onNextWeek={goToNextWeek}
      />
      <FlatList
        data={routes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No routes for this date</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};
