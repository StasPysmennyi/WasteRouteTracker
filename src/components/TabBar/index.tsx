import { type ElementType } from 'react';
import { Pressable, Text, View } from 'react-native';

import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { type Route } from '@react-navigation/native';

import { COLORS } from 'src/constants';

import { type TYPES } from 'src/models';

import { styles } from './styles';

type Props = BottomTabBarProps & {
  tabBarIconsConfig: Record<string, ElementType<TYPES.IconProps>>;
};

export const TabBar = ({
  state,
  descriptors,
  navigation,
  tabBarIconsConfig,
}: Props) => (
  <View style={styles.container}>
    {state.routes.map((route: Route<string>, index: number) => {
      const { options } = descriptors[route.key];
      const isFocused = state.index === index;
      const label = (options.tabBarLabel as string) || route.name;
      const Icon = tabBarIconsConfig[label];
      const fillColor = isFocused ? COLORS.primary : COLORS.textSecondary;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({ type: 'tabLongPress', target: route.key });
      };

      return (
        <Pressable
          key={route.key}
          style={styles.tab}
          onPress={onPress}
          onLongPress={onLongPress}
          accessibilityLabel={options.tabBarAccessibilityLabel}>
          {Icon ? <Icon fill={fillColor} width={24} height={24} /> : null}
          <Text
            style={[
              styles.tabLabel,
              isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
            ]}>
            {label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);
