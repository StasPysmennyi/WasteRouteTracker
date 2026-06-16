import { useCallback, useMemo, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { PressEventWithFeatures } from '@maplibre/maplibre-react-native';
import { Camera, type CameraRef, Map } from '@maplibre/maplibre-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icons, WeekStrip } from 'src/components';

import { selectSelectedRouteId, setSelectedRouteId } from 'src/store';

import { useAppDispatch, useAppSelector, useScreenRoutes } from 'src/hooks';

import {
  calculateRouteTotals,
  EMPTY_LINE_GEOJSON,
  EMPTY_POINTS_GEOJSON,
  toGeoJSON,
  toPolyline,
} from 'src/utils';

import { COLORS, MAP_CONFIG, MAP_LAYER, ROUTE_COLORS } from 'src/constants';

import { RouteSlot, RouteSummaryBar, RouteToggleButton } from './components';
import { styles } from './styles';

type MarkerInfo = {
  addresses: string[];
  containers: number;
  volume: number;
  color: string;
};

export const MapScreen = () => {
  const dispatch = useAppDispatch();
  const selectedRouteId = useAppSelector(selectSelectedRouteId);
  const cameraRef = useRef<CameraRef>(null);
  const [zoom, setZoom] = useState<number>(MAP_CONFIG.initialZoom);
  const [markerInfo, setMarkerInfo] = useState<MarkerInfo | null>(null);

  const {
    routes,
    selectedDate,
    availableDates,
    weekDates,
    goToPrevWeek,
    goToNextWeek,
    handleSelectDate,
  } = useScreenRoutes();

  const displayRoutes = selectedRouteId
    ? routes.filter(route => route.id === selectedRouteId)
    : routes;

  const { totalGeocoded, totalStops, totalContainers, totalVolume } =
    calculateRouteTotals(routes);

  const handleZoomIn = useCallback(() => {
    const next = zoom + MAP_CONFIG.zoomStep;
    cameraRef.current?.zoomTo(next, {
      duration: MAP_CONFIG.zoomAnimationDuration,
    });
    setZoom(next);
  }, [zoom]);

  const handleZoomOut = useCallback(() => {
    const next = Math.max(1, zoom - MAP_CONFIG.zoomStep);
    cameraRef.current?.zoomTo(next, {
      duration: MAP_CONFIG.zoomAnimationDuration,
    });
    setZoom(next);
  }, [zoom]);

  const handleDismissMarker = useCallback(() => {
    setMarkerInfo(null);
  }, []);

  const markerAccentStyle = useMemo(
    () =>
      StyleSheet.flatten([
        styles.markerPopupAccent,
        { backgroundColor: markerInfo?.color },
      ]),
    [markerInfo?.color],
  );

  const handleCycleRoute = useCallback(() => {
    if (routes.length === 0) {
      return;
    }
    if (!selectedRouteId) {
      dispatch(setSelectedRouteId(routes[0].id));
      return;
    }
    const idx = routes.findIndex(route => route.id === selectedRouteId);
    const isLastRoute = idx === routes.length - 1;
    dispatch(setSelectedRouteId(isLastRoute ? null : routes[idx + 1].id));
  }, [dispatch, routes, selectedRouteId]);

  const makeStopPressHandler = useCallback(
    (color: string) => (e: NativeSyntheticEvent<PressEventWithFeatures>) => {
      e.stopPropagation();
      const feature = e.nativeEvent.features[0];
      if (!feature?.properties) {
        return;
      }
      const props = feature.properties;

      if (props.point_count) {
        const next = zoom + MAP_CONFIG.clusterZoomStep;
        cameraRef.current?.zoomTo(next, {
          duration: MAP_CONFIG.clusterZoomAnimationDuration,
        });
        setZoom(next);
        return;
      }

      setMarkerInfo(prev => {
        if (prev?.addresses[0] === props.address && prev?.color === color) {
          return null;
        }
        return {
          addresses: [props.address as string],
          containers: props.containers as number,
          volume: props.volume as number,
          color,
        };
      });
    },
    [zoom],
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
      <View style={styles.mapContainer}>
        <Map
          style={styles.map}
          mapStyle={MAP_CONFIG.styleUrl}
          onPress={handleDismissMarker}>
          <Camera
            ref={cameraRef}
            initialViewState={{
              center: MAP_CONFIG.initialCenter,
              zoom: MAP_CONFIG.initialZoom,
            }}
          />

          {Array.from({ length: MAP_LAYER.maxRoutesPerDay }, (_, slotIdx) => {
            const route = routes[slotIdx];
            const color = ROUTE_COLORS[slotIdx % ROUTE_COLORS.length];
            const visible =
              !!route && displayRoutes.some(r => r.id === route.id);
            return (
              <RouteSlot
                key={slotIdx}
                slotIdx={slotIdx}
                color={color}
                visible={visible}
                geojson={
                  visible
                    ? JSON.stringify(
                        toGeoJSON(route.geocodedStops, route.id, color),
                      )
                    : EMPTY_POINTS_GEOJSON
                }
                polyline={
                  visible
                    ? JSON.stringify(toPolyline(route.geocodedStops))
                    : EMPTY_LINE_GEOJSON
                }
                onPress={makeStopPressHandler(color)}
              />
            );
          })}
        </Map>

        <View style={styles.zoomControls}>
          <Pressable style={styles.zoomButton} onPress={handleZoomIn}>
            <Text style={styles.zoomButtonText}>+</Text>
          </Pressable>
          <Pressable style={styles.zoomButton} onPress={handleZoomOut}>
            <Text style={styles.zoomButtonText}>−</Text>
          </Pressable>
        </View>

        {routes.length > 1 && (
          <RouteToggleButton
            selectedRouteId={selectedRouteId}
            onPress={handleCycleRoute}
          />
        )}

        {markerInfo && (
          <View style={styles.markerPopup}>
            <View style={markerAccentStyle} />
            <View style={styles.markerPopupBody}>
              {markerInfo.addresses.map(addr => (
                <Text
                  key={addr}
                  style={styles.markerPopupAddress}
                  numberOfLines={2}>
                  {addr}
                </Text>
              ))}
              <Text style={styles.markerPopupMeta}>
                {`Bins: ${markerInfo.containers} · Vol: ${markerInfo.volume.toFixed(2)} m³`}
              </Text>
            </View>
            <Pressable
              style={styles.markerPopupClose}
              onPress={handleDismissMarker}>
              <Icons.CloseIcon
                width={16}
                height={16}
                fill={COLORS.textSecondary}
              />
            </Pressable>
          </View>
        )}
      </View>

      <RouteSummaryBar
        routeCount={routes.length}
        totalStops={totalStops}
        geocodedCount={totalGeocoded}
        totalContainers={totalContainers}
        totalVolume={totalVolume}
      />
    </SafeAreaView>
  );
};
