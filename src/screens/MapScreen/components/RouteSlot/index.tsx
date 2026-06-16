import { Fragment } from 'react';

import type { PressEventWithFeatures } from '@maplibre/maplibre-react-native';
import { GeoJSONSource, Layer } from '@maplibre/maplibre-react-native';
import type { NativeSyntheticEvent } from 'react-native';

import { MAP_LAYER } from 'src/constants';

type Props = {
  slotIdx: number;
  color: string;
  visible: boolean;
  geojson: string;
  polyline: string;
  onPress: (e: NativeSyntheticEvent<PressEventWithFeatures>) => void;
};

export const RouteSlot = ({
  slotIdx,
  color,
  visible,
  geojson,
  polyline,
  onPress,
}: Props) => (
  <Fragment>
    <GeoJSONSource id={`polyline-slot-${slotIdx}`} data={polyline}>
      <Layer
        id={`polyline-line-slot-${slotIdx}`}
        type="line"
        layout={{ visibility: visible ? 'visible' : 'none' }}
        paint={{
          'line-color': color,
          'line-width': MAP_LAYER.polylineWidth,
          'line-dasharray': MAP_LAYER.polylineDash,
        }}
      />
    </GeoJSONSource>
    <GeoJSONSource
      id={`stops-slot-${slotIdx}`}
      data={geojson}
      cluster
      clusterRadius={MAP_LAYER.clusterGroupRadius}
      clusterMinPoints={MAP_LAYER.clusterMinPoints}
      onPress={onPress}>
      <Layer
        id={`clusters-circle-slot-${slotIdx}`}
        type="circle"
        filter={['has', 'point_count']}
        paint={{
          'circle-color': color,
          'circle-radius': MAP_LAYER.clusterRadius,
          'circle-stroke-width': MAP_LAYER.clusterStrokeWidth,
          'circle-stroke-color': MAP_LAYER.clusterStroke,
        }}
      />
      <Layer
        id={`clusters-count-slot-${slotIdx}`}
        type="symbol"
        filter={['has', 'point_count']}
        layout={{
          'text-field': '{point_count_abbreviated}',
          'text-size': MAP_LAYER.clusterTextSize,
          'text-font': MAP_LAYER.fontBold,
        }}
        paint={{ 'text-color': MAP_LAYER.clusterTextColor }}
      />
      <Layer
        id={`stops-circle-slot-${slotIdx}`}
        type="circle"
        filter={['!', ['has', 'point_count']]}
        paint={{
          'circle-color': MAP_LAYER.stopFill,
          'circle-radius': MAP_LAYER.stopRadius,
          'circle-stroke-width': MAP_LAYER.stopStrokeWidth,
          'circle-stroke-color': color,
        }}
      />
      <Layer
        id={`stops-label-slot-${slotIdx}`}
        type="symbol"
        filter={['!', ['has', 'point_count']]}
        layout={{
          'text-field': ['to-string', ['get', 'order']],
          'text-size': MAP_LAYER.stopTextSize,
          'text-font': MAP_LAYER.fontRegular,
        }}
        paint={{ 'text-color': MAP_LAYER.stopTextColor }}
      />
    </GeoJSONSource>
  </Fragment>
);
