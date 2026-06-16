import { Text, View } from 'react-native';

import { ROUTE_COLORS } from 'src/constants';

import { styles } from './styles';

type Props = {
  address: string;
  containerCount: number;
  rank: number;
};

export const TopAddressItem = ({ address, containerCount, rank }: Props) => (
  <View style={styles.container}>
    <View
      style={[
        styles.rank,
        { backgroundColor: ROUTE_COLORS[(rank - 1) % ROUTE_COLORS.length] },
      ]}>
      <Text style={styles.rankText}>{rank}</Text>
    </View>
    <View style={styles.info}>
      <Text style={styles.address} numberOfLines={1}>
        {address}
      </Text>
      <Text style={styles.count}>{containerCount} containers</Text>
    </View>
  </View>
);
