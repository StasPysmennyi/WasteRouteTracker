import { type ComponentType } from 'react';

import { type BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { MapScreen, RoutesScreen, StatsScreen } from 'src/screens';

import { ENUMS } from 'src/models';

type TabScreen = {
  name: ENUMS.TabNames;
  component: ComponentType;
  options: BottomTabNavigationOptions;
};

export const SCREENS: TabScreen[] = [
  {
    name: ENUMS.TabNames.MAP,
    component: MapScreen,
    options: {
      tabBarLabel: ENUMS.TabNames.MAP,
      tabBarAccessibilityLabel: 'tab-map',
    },
  },
  {
    name: ENUMS.TabNames.ROUTES,
    component: RoutesScreen,
    options: {
      tabBarLabel: ENUMS.TabNames.ROUTES,
      tabBarAccessibilityLabel: 'tab-routes',
    },
  },
  {
    name: ENUMS.TabNames.STATS,
    component: StatsScreen,
    options: {
      tabBarLabel: ENUMS.TabNames.STATS,
      tabBarAccessibilityLabel: 'tab-stats',
    },
  },
];
