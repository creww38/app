export const colors = {
  // Primary Colors
  primary: '#3498db',
  primaryLight: '#85C1E9',
  primaryDark: '#21618C',
  
  // Secondary Colors
  secondary: '#2ecc71',
  secondaryLight: '#82E0AA',
  secondaryDark: '#1D8348',
  
  // Status Colors
  success: '#27ae60',
  successLight: '#A3E4D7',
  warning: '#f39c12',
  warningLight: '#FDEBD0',
  danger: '#e74c3c',
  dangerLight: '#FADBD8',
  info: '#3498db',
  infoLight: '#D6EAF8',
  
  // Neutral Colors
  white: '#ffffff',
  black: '#000000',
  lightGray: '#f5f5f5',
  gray: '#95a5a6',
  darkGray: '#7f8c8d',
  border: '#d5dbdb',
  
  // Text Colors
  textPrimary: '#2c3e50',
  textSecondary: '#566573',
  textLight: '#7f8c8d',
  textDisabled: '#bdc3c7',
  
  // Background Colors
  background: '#f8f9fa',
  surface: '#ffffff',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Special Colors
  shadow: '#000000',
  transparent: 'transparent',
  backdrop: 'rgba(0, 0, 0, 0.3)',
  
  // Social Media Colors
  facebook: '#1877F2',
  google: '#DB4437',
  twitter: '#1DA1F2',
  
  // Additional UI Colors
  highlight: '#fffacd',
  selected: '#e3f2fd',
  placeholder: '#cccccc',
  
  // Gradient Colors
  gradientStart: '#3498db',
  gradientEnd: '#2ecc71',
  
  // Chart Colors
  chart1: '#3498db',
  chart2: '#2ecc71',
  chart3: '#e74c3c',
  chart4: '#f39c12',
  chart5: '#9b59b6',
};

// Export color palettes
export const colorPalettes = {
  blue: ['#EBF5FB', '#D6EAF8', '#85C1E9', '#3498db', '#21618C'],
  green: ['#EAFAF1', '#D5F5E3', '#82E0AA', '#27ae60', '#1D8348'],
  red: ['#FDEDEC', '#FADBD8', '#F1948A', '#e74c3c', '#B03A2E'],
  yellow: ['#FEF9E7', '#FCF3CF', '#F7DC6F', '#f39c12', '#B7950B'],
  purple: ['#F4ECF7', '#EBDEF0', '#C39BD3', '#9b59b6', '#76448A'],
};

// Color utility functions
export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'hadir':
    case 'success':
    case 'active':
      return colors.success;
    case 'izin':
    case 'warning':
    case 'pending':
      return colors.warning;
    case 'sakit':
    case 'info':
      return colors.info;
    case 'alpha':
    case 'danger':
    case 'inactive':
      return colors.danger;
    default:
      return colors.gray;
  }
};

export const getStatusBackground = (status) => {
  switch (status?.toLowerCase()) {
    case 'hadir':
    case 'success':
    case 'active':
      return colors.successLight;
    case 'izin':
    case 'warning':
    case 'pending':
      return colors.warningLight;
    case 'sakit':
    case 'info':
      return colors.infoLight;
    case 'alpha':
    case 'danger':
    case 'inactive':
      return colors.dangerLight;
    default:
      return colors.lightGray;
  }
};

export const rgba = (color, opacity) => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const darken = (color, percent) => {
  // Darken a color by given percent
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  
  return '#' + (
    0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1);
};

export const lighten = (color, percent) => {
  // Lighten a color by given percent
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return '#' + (
    0x1000000 +
    (R > 255 ? 255 : R > 1 ? R : 1) * 0x10000 +
    (G > 255 ? 255 : G > 1 ? G : 1) * 0x100 +
    (B > 255 ? 255 : B > 1 ? B : 1)
  ).toString(16).slice(1);
};

export default colors;