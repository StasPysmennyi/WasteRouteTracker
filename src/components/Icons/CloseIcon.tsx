import Svg, { Path } from 'react-native-svg';

import { COLORS } from 'src/constants';

import { type TYPES } from 'src/models';

export const CloseIcon = ({
  width = 24,
  height = 24,
  fill = COLORS.primary,
}: TYPES.IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 6l12 12M18 6L6 18"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
