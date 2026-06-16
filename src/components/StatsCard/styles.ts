import { StyleSheet } from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    width: '31%',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: SPACING.md,
    margin: SPACING.xs,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  value: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
});
