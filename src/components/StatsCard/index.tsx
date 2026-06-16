import { memo } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

type Props = {
  label: string;
  value: string | number;
  subtitle?: string;
  color?: string;
};

export const StatsCard = memo(({ label, value, subtitle, color }: Props) => (
  <View style={styles.container}>
    <Text
      style={[styles.value, color ? { color } : {}]}
      numberOfLines={1}
      adjustsFontSizeToFit>
      {value}
    </Text>
    <Text style={styles.label}>{label}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
));
