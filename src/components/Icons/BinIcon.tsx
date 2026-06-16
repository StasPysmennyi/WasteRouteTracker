import Svg, { Path, Rect } from 'react-native-svg';

import { COLORS } from 'src/constants';

import { type TYPES } from 'src/models';

export const BinIcon = ({
  width = 24,
  height = 24,
  fill = COLORS.primary,
}: TYPES.IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6h18v2H3V6z" fill={fill} />
    <Path d="M8 6V4h8v2" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    <Rect
      x="5"
      y="8"
      width="14"
      height="12"
      rx="1"
      stroke={fill}
      strokeWidth="2"
      fill="none"
    />
    <Path
      d="M10 11v5M14 11v5"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);
