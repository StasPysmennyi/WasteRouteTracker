export const MAP_CONFIG = {
  // [longitude, latitude] — GeoJSON / MapLibre format
  initialCenter: [23.7215, 56.6511] as [number, number],
  initialZoom: 13,
  styleUrl: 'https://tiles.openfreemap.org/styles/liberty',
  zoomStep: 1,
  zoomAnimationDuration: 300,
  clusterZoomStep: 2,
  clusterZoomAnimationDuration: 400,
} as const;

export const MAP_LAYER = {
  clusterStroke: '#ffffff',
  clusterTextColor: '#ffffff',
  stopFill: '#ffffff',
  stopTextColor: '#333333',
  polylineWidth: 3,
  polylineDash: [2, 2] as number[],
  clusterGroupRadius: 40,
  clusterMinPoints: 2,
  clusterRadius: 20,
  stopRadius: 14,
  stopStrokeWidth: 2,
  clusterStrokeWidth: 2,
  clusterTextSize: 12,
  stopTextSize: 11,
  // OpenFreeMap Liberty's glyph server only serves single-name fontstacks —
  // combined stacks like ['Noto Sans Bold', 'Noto Sans Regular'] 404.
  fontBold: ['Noto Sans Bold'] as string[],
  fontRegular: ['Noto Sans Regular'] as string[],
  maxRoutesPerDay: 6,
} as const;
