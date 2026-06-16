import { Pressable, Text } from 'react-native';

import { Icons } from 'src/components';

import { COLORS } from 'src/constants';

import { styles } from './styles';

type Props = {
  selectedRouteId: string | null;
  onPress: () => void;
};

export const RouteToggleButton = ({ selectedRouteId, onPress }: Props) => (
  <Pressable style={styles.container} onPress={onPress}>
    <Icons.RouteIcon width={16} height={16} fill={COLORS.white} />
    <Text style={styles.label}>
      {selectedRouteId ? `Route: ${selectedRouteId}` : 'All Routes'}
    </Text>
  </Pressable>
);
