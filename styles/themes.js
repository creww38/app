import { colors } from './colors';

export const lightTheme = {
  colors: {
    ...colors,
    background: '#f8f9fa',
    surface: '#ffffff',
    textPrimary: '#2c3e50',
    textSecondary: '#566573',
    border: '#d5dbdb',
    card: '#ffffff',
    modalBackground: 'rgba(0, 0, 0, 0.5)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    body1: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      textTransform: 'uppercase',
    },
  },
  shadows: {
    sm: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

export const darkTheme = {
  colors: {
    ...colors,
    primary: '#4dabf7',
    background: '#121212',
    surface: '#1e1e1e',
    textPrimary: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#333333',
    card: '#252525',
    modalBackground: 'rgba(0, 0, 0, 0.7)',
    lightGray: '#2d2d2d',
    gray: '#555555',
  },
  spacing: { ...lightTheme.spacing },
  borderRadius: { ...lightTheme.borderRadius },
  typography: { ...lightTheme.typography },
  shadows: {
    sm: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// Utility functions for theme
export const getTheme = (isDarkMode = false) => {
  return isDarkMode ? darkTheme : lightTheme;
};

export const createStyles = (stylesFunction) => {
  return (theme) => stylesFunction(theme);
};

// Common component styles
export const commonStyles = {
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  }),
  card: (theme) => ({
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  }),
  button: (theme, variant = 'primary') => {
    const variants = {
      primary: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.secondary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: theme.colors.primary,
        borderWidth: 1,
      },
      danger: {
        backgroundColor: theme.colors.danger,
        borderColor: theme.colors.danger,
      },
    };
    
    return {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      ...variants[variant],
    };
  },
  buttonText: (theme, variant = 'primary') => {
    const variants = {
      primary: { color: theme.colors.white },
      secondary: { color: theme.colors.white },
      outline: { color: theme.colors.primary },
      danger: { color: theme.colors.white },
    };
    
    return {
      fontSize: theme.typography.button.fontSize,
      fontWeight: theme.typography.button.fontWeight,
      ...variants[variant],
    };
  },
  input: (theme) => ({
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.textPrimary,
  }),
  header: (theme) => ({
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: theme.spacing.md,
  }),
};

export default lightTheme;