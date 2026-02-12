import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from './colors';
import { themes } from './themes';

const { width, height } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  flexShrink1: {
    flexShrink: 1,
  },
  wrap: {
    flexWrap: 'wrap',
  },

  // Spacing
  p4: { padding: 4 },
  p8: { padding: 8 },
  p12: { padding: 12 },
  p16: { padding: 16 },
  p20: { padding: 20 },
  p24: { padding: 24 },
  p32: { padding: 32 },
  
  px4: { paddingHorizontal: 4 },
  px8: { paddingHorizontal: 8 },
  px12: { paddingHorizontal: 12 },
  px16: { paddingHorizontal: 16 },
  px20: { paddingHorizontal: 20 },
  px24: { paddingHorizontal: 24 },
  
  py4: { paddingVertical: 4 },
  py8: { paddingVertical: 8 },
  py12: { paddingVertical: 12 },
  py16: { paddingVertical: 16 },
  py20: { paddingVertical: 20 },
  py24: { paddingVertical: 24 },
  
  pt4: { paddingTop: 4 },
  pt8: { paddingTop: 8 },
  pt12: { paddingTop: 12 },
  pt16: { paddingTop: 16 },
  pt20: { paddingTop: 20 },
  pt24: { paddingTop: 24 },
  pt32: { paddingTop: 32 },
  pt40: { paddingTop: 40 },
  pt48: { paddingTop: 48 },
  
  pb4: { paddingBottom: 4 },
  pb8: { paddingBottom: 8 },
  pb12: { paddingBottom: 12 },
  pb16: { paddingBottom: 16 },
  pb20: { paddingBottom: 20 },
  pb24: { paddingBottom: 24 },
  pb32: { paddingBottom: 32 },
  
  pl4: { paddingLeft: 4 },
  pl8: { paddingLeft: 8 },
  pl12: { paddingLeft: 12 },
  pl16: { paddingLeft: 16 },
  pl20: { paddingLeft: 20 },
  pl24: { paddingLeft: 24 },
  
  pr4: { paddingRight: 4 },
  pr8: { paddingRight: 8 },
  pr12: { paddingRight: 12 },
  pr16: { paddingRight: 16 },
  pr20: { paddingRight: 20 },
  pr24: { paddingRight: 24 },

  m4: { margin: 4 },
  m8: { margin: 8 },
  m12: { margin: 12 },
  m16: { margin: 16 },
  m20: { margin: 20 },
  m24: { margin: 24 },
  m32: { margin: 32 },
  
  mx4: { marginHorizontal: 4 },
  mx8: { marginHorizontal: 8 },
  mx12: { marginHorizontal: 12 },
  mx16: { marginHorizontal: 16 },
  mx20: { marginHorizontal: 20 },
  mx24: { marginHorizontal: 24 },
  mxAuto: { marginHorizontal: 'auto' },
  
  my4: { marginVertical: 4 },
  my8: { marginVertical: 8 },
  my12: { marginVertical: 12 },
  my16: { marginVertical: 16 },
  my20: { marginVertical: 20 },
  my24: { marginVertical: 24 },
  myAuto: { marginVertical: 'auto' },
  
  mt4: { marginTop: 4 },
  mt8: { marginTop: 8 },
  mt12: { marginTop: 12 },
  mt16: { marginTop: 16 },
  mt20: { marginTop: 20 },
  mt24: { marginTop: 24 },
  mt32: { marginTop: 32 },
  mtAuto: { marginTop: 'auto' },
  
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb20: { marginBottom: 20 },
  mb24: { marginBottom: 24 },
  mb32: { marginBottom: 32 },
  mbAuto: { marginBottom: 'auto' },
  
  ml4: { marginLeft: 4 },
  ml8: { marginLeft: 8 },
  ml12: { marginLeft: 12 },
  ml16: { marginLeft: 16 },
  ml20: { marginLeft: 20 },
  ml24: { marginLeft: 24 },
  mlAuto: { marginLeft: 'auto' },
  
  mr4: { marginRight: 4 },
  mr8: { marginRight: 8 },
  mr12: { marginRight: 12 },
  mr16: { marginRight: 16 },
  mr20: { marginRight: 20 },
  mr24: { marginRight: 24 },
  mrAuto: { marginRight: 'auto' },

  // Dimensions
  wFull: { width: '100%' },
  hFull: { height: '100%' },
  wScreen: { width },
  hScreen: { height },
  w25: { width: '25%' },
  w33: { width: '33.333%' },
  w50: { width: '50%' },
  w66: { width: '66.666%' },
  w75: { width: '75%' },
  w100: { width: 100 },
  w200: { width: 200 },
  w300: { width: 300 },
  h100: { height: 100 },
  h200: { height: 200 },
  h300: { height: 300 },
  minW0: { minWidth: 0 },
  minH0: { minHeight: 0 },
  maxWFull: { maxWidth: '100%' },
  maxHFull: { maxHeight: '100%' },

  // Typography
  textCenter: { textAlign: 'center' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },
  textJustify: { textAlign: 'justify' },
  
  textXs: { fontSize: 12, lineHeight: 16 },
  textSm: { fontSize: 14, lineHeight: 20 },
  textBase: { fontSize: 16, lineHeight: 24 },
  textLg: { fontSize: 18, lineHeight: 28 },
  textXl: { fontSize: 20, lineHeight: 28 },
  text2xl: { fontSize: 24, lineHeight: 32 },
  text3xl: { fontSize: 30, lineHeight: 36 },
  text4xl: { fontSize: 36, lineHeight: 40 },
  
  fontThin: { fontWeight: '100' },
  fontExtralight: { fontWeight: '200' },
  fontLight: { fontWeight: '300' },
  fontNormal: { fontWeight: '400' },
  fontMedium: { fontWeight: '500' },
  fontSemibold: { fontWeight: '600' },
  fontBold: { fontWeight: '700' },
  fontExtrabold: { fontWeight: '800' },
  fontBlack: { fontWeight: '900' },
  
  italic: { fontStyle: 'italic' },
  underline: { textDecorationLine: 'underline' },
  lineThrough: { textDecorationLine: 'line-through' },
  uppercase: { textTransform: 'uppercase' },
  lowercase: { textTransform: 'lowercase' },
  capitalize: { textTransform: 'capitalize' },

  // Colors - Text
  textPrimary: { color: colors.textPrimary },
  textSecondary: { color: colors.textSecondary },
  textLight: { color: colors.textLight },
  textDisabled: { color: colors.textDisabled },
  textWhite: { color: colors.white },
  textBlack: { color: colors.black },
  textSuccess: { color: colors.success },
  textWarning: { color: colors.warning },
  textDanger: { color: colors.danger },
  textInfo: { color: colors.info },
  textPrimaryColor: { color: colors.primary },

  // Colors - Background
  bgTransparent: { backgroundColor: colors.transparent },
  bgWhite: { backgroundColor: colors.white },
  bgBlack: { backgroundColor: colors.black },
  bgPrimary: { backgroundColor: colors.primary },
  bgPrimaryLight: { backgroundColor: colors.primaryLight },
  bgPrimaryDark: { backgroundColor: colors.primaryDark },
  bgSecondary: { backgroundColor: colors.secondary },
  bgSuccess: { backgroundColor: colors.success },
  bgSuccessLight: { backgroundColor: colors.successLight },
  bgWarning: { backgroundColor: colors.warning },
  bgWarningLight: { backgroundColor: colors.warningLight },
  bgDanger: { backgroundColor: colors.danger },
  bgDangerLight: { backgroundColor: colors.dangerLight },
  bgInfo: { backgroundColor: colors.info },
  bgInfoLight: { backgroundColor: colors.infoLight },
  bgLightGray: { backgroundColor: colors.lightGray },
  bgGray: { backgroundColor: colors.gray },
  bgDarkGray: { backgroundColor: colors.darkGray },
  bgBackground: { backgroundColor: colors.background },
  bgSurface: { backgroundColor: colors.surface },

  // Borders
  border: { borderWidth: 1, borderColor: colors.border },
  border0: { borderWidth: 0 },
  border2: { borderWidth: 2 },
  border4: { borderWidth: 4 },
  borderT: { borderTopWidth: 1, borderTopColor: colors.border },
  borderB: { borderBottomWidth: 1, borderBottomColor: colors.border },
  borderL: { borderLeftWidth: 1, borderLeftColor: colors.border },
  borderR: { borderRightWidth: 1, borderRightColor: colors.border },
  
  borderPrimary: { borderColor: colors.primary },
  borderSuccess: { borderColor: colors.success },
  borderWarning: { borderColor: colors.warning },
  borderDanger: { borderColor: colors.danger },
  borderInfo: { borderColor: colors.info },
  borderWhite: { borderColor: colors.white },
  borderTransparent: { borderColor: colors.transparent },

  // Border Radius
  roundedNone: { borderRadius: 0 },
  roundedSm: { borderRadius: 4 },
  rounded: { borderRadius: 8 },
  roundedMd: { borderRadius: 12 },
  roundedLg: { borderRadius: 16 },
  roundedXl: { borderRadius: 20 },
  rounded2xl: { borderRadius: 24 },
  roundedFull: { borderRadius: 9999 },
  roundedTLNone: { borderTopLeftRadius: 0 },
  roundedTRNone: { borderTopRightRadius: 0 },
  roundedBLNone: { borderBottomLeftRadius: 0 },
  roundedBRNone: { borderBottomRightRadius: 0 },

  // Positioning
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  top0: { top: 0 },
  right0: { right: 0 },
  bottom0: { bottom: 0 },
  left0: { left: 0 },
  inset0: { top: 0, right: 0, bottom: 0, left: 0 },
  z0: { zIndex: 0 },
  z10: { zIndex: 10 },
  z20: { zIndex: 20 },
  z30: { zIndex: 30 },
  z40: { zIndex: 40 },
  z50: { zIndex: 50 },
  zAuto: { zIndex: 'auto' },

  // Overflow
  overflowHidden: { overflow: 'hidden' },
  overflowVisible: { overflow: 'visible' },
  overflowScroll: { overflow: 'scroll' },

  // Opacity
  opacity0: { opacity: 0 },
  opacity25: { opacity: 0.25 },
  opacity50: { opacity: 0.5 },
  opacity75: { opacity: 0.75 },
  opacity100: { opacity: 1 },

  // Shadows
  shadowSm: {
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  shadowMd: {
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  shadowLg: {
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  shadowXl: {
    elevation: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  shadowNone: {
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },

  // Platform Specific
  iosShadow: Platform.select({
    ios: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),

  // Common Components
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.textPrimary,
  },
  
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  
  errorText: {
    color: colors.danger,
    fontSize: 14,
    marginTop: 4,
  },
  
  successText: {
    color: colors.success,
    fontSize: 14,
    marginTop: 4,
  },
  
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  
  avatarLg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  
  avatarXl: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  // Utility Classes
  hidden: { display: 'none' },
  visible: { display: 'flex' },
  flex: { display: 'flex' },
  block: { display: 'block' },
  inlineBlock: { display: 'inline-block' },
  
  alignStart: { alignItems: 'flex-start' },
  alignCenter: { alignItems: 'center' },
  alignEnd: { alignItems: 'flex-end' },
  alignStretch: { alignItems: 'stretch' },
  
  justifyStart: { justifyContent: 'flex-start' },
  justifyCenter: { justifyContent: 'center' },
  justifyEnd: { justifyContent: 'flex-end' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyAround: { justifyContent: 'space-around' },
  justifyEvenly: { justifyContent: 'space-evenly' },
  
  selfStart: { alignSelf: 'flex-start' },
  selfCenter: { alignSelf: 'center' },
  selfEnd: { alignSelf: 'flex-end' },
  selfStretch: { alignSelf: 'stretch' },
  
  flexNone: { flex: 'none' },
  flexAuto: { flex: '1 1 auto' },
  
  orderFirst: { order: -1 },
  orderLast: { order: 9999 },
  orderNone: { order: 0 },
});

// Export helper functions
export const createResponsiveStyle = (breakpoints = {}) => {
  const { sm = 640, md = 768, lg = 1024, xl = 1280 } = breakpoints;
  
  return {
    sm: `@media (min-width: ${sm}px)`,
    md: `@media (min-width: ${md}px)`,
    lg: `@media (min-width: ${lg}px)`,
    xl: `@media (min-width: ${xl}px)`,
  };
};

export const getResponsiveValue = (values, screenWidth) => {
  if (Array.isArray(values)) {
    if (screenWidth >= 1280) return values[3] || values[2] || values[1] || values[0];
    if (screenWidth >= 1024) return values[2] || values[1] || values[0];
    if (screenWidth >= 768) return values[1] || values[0];
    return values[0];
  }
  return values;
};

export default globalStyles;