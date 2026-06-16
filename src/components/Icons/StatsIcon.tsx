import Svg, { Rect } from 'react-native-svg';

import { COLORS } from 'src/constants';

import { type TYPES } from 'src/models';

export const StatsIcon = ({
  width = 24,
  height = 24,
  fill = COLORS.primary,
}: TYPES.IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="12" width="4" height="9" rx="1" fill={fill} />
    <Rect x="10" y="7" width="4" height="14" rx="1" fill={fill} />
    <Rect x="17" y="3" width="4" height="18" rx="1" fill={fill} />
  </Svg>
);
