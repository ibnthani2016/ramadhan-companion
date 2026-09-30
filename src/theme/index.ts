// Theme - Export all theme modules
export { colors, default as colorsDefault } from './colors';
export { spacing, borderRadius, shadows, default as spacingDefault } from './spacing';
export { typography, default as typographyDefault } from './typography';

// Common component styles
import { colors } from './colors';
import { spacing, borderRadius, shadows } from './spacing';

export const commonStyles = {
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  
  // Screen padding
  screenPadding: {
    padding: spacing.md,
  },
  
  // Center content
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Row
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  
  // Space between
  spaceBetween: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.sm,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
  commonStyles,
};
