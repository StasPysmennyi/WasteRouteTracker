import { StyleSheet } from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.primary,
  },
  date: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  sub: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.white,
    opacity: 0.85,
    marginTop: 2,
  },
});
