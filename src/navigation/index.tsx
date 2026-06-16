import { useCallback } from 'react';

import {
  type BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { TabBar } from 'src/components';

import { TAB_BAR_ICONS_CONFIG } from 'src/constants';

import { type TYPES } from 'src/models';

import { SCREENS } from './screens';

const Tab = createBottomTabNavigator<TYPES.TabParamList>();

export const Navigation = () => {
  const renderTabBar = useCallback(
    (props: BottomTabBarProps) => (
      <TabBar {...props} tabBarIconsConfig={TAB_BAR_ICONS_CONFIG} />
    ),
    [],
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={renderTabBar}
        screenOptions={{ headerShown: false }}>
        {SCREENS.map(({ name, component, options }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
