import Svg, { Path, Rect } from 'react-native-svg';

import { COLORS } from 'src/constants';

import { type TYPES } from 'src/models';

export const CalendarIcon = ({
  width = 24,
  height = 24,
  fill = COLORS.primary,
}: TYPES.IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="4"
      width="18"
      height="17"
      rx="2"
      stroke={fill}
      strokeWidth="2"
      fill="none"
    />
    <Path
      d="M16 2v4M8 2v4M3 10h18"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Rect x="7" y="14" width="3" height="3" rx="0.5" fill={fill} />
    <Rect x="14" y="14" width="3" height="3" rx="0.5" fill={fill} />
  </Svg>
);
