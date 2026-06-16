import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { TabNames } from '../enums/tabNames';

export type TabParamList = {
  [TabNames.MAP]: undefined;
  [TabNames.ROUTES]: undefined;
  [TabNames.STATS]: undefined;
};

export type ScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<
  TabParamList,
  T
>;

export type RootStackParamList = TabParamList;
