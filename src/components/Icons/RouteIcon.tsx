import Svg, { Circle, Path } from 'react-native-svg';

import { COLORS } from 'src/constants';

import { type TYPES } from 'src/models';

export const RouteIcon = ({
  width = 24,
  height = 24,
  fill = COLORS.primary,
}: TYPES.IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 17h18M3 12h18M3 7h18"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Circle cx="7" cy="7" r="2" fill={fill} />
    <Circle cx="17" cy="12" r="2" fill={fill} />
    <Circle cx="7" cy="17" r="2" fill={fill} />
  </Svg>
);
