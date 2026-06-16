import { type ElementType } from 'react';

import { Icons } from 'src/components';

import { ENUMS, type TYPES } from 'src/models';

export const TAB_BAR_ICONS_CONFIG: Record<
  ENUMS.TabNames,
  ElementType<TYPES.IconProps>
> = {
  [ENUMS.TabNames.MAP]: Icons.RouteIcon,
  [ENUMS.TabNames.ROUTES]: Icons.BinIcon,
  [ENUMS.TabNames.STATS]: Icons.StatsIcon,
};
