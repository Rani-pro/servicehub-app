import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Screen Size Categories ────────────────────────────────────────────────
export const SCREEN_SIZES = {
  SMALL: 'small',   // < 375px width (iPhone SE, small Android)
  MEDIUM: 'medium', // 375-414px width (iPhone 12, most phones)
  LARGE: 'large',   // > 414px width (iPhone Plus, large Android, tablets)
} as const;

export type ScreenSize = typeof SCREEN_SIZES[keyof typeof SCREEN_SIZES];

// ─── Device Detection ──────────────────────────────────────────────────────
export const getScreenSize = (): ScreenSize => {
  if (SCREEN_WIDTH < 375) return SCREEN_SIZES.SMALL;
  if (SCREEN_WIDTH <= 414) return SCREEN_SIZES.MEDIUM;
  return SCREEN_SIZES.LARGE;
};

export const isTablet = (): boolean => {
  return SCREEN_WIDTH >= 768;
};

export const isSmallDevice = (): boolean => {
  return getScreenSize() === SCREEN_SIZES.SMALL;
};

export const isLargeDevice = (): boolean => {
  return getScreenSize() === SCREEN_SIZES.LARGE || isTablet();
};

// ─── Responsive Dimensions ─────────────────────────────────────────────────
// Use these for width-based responsive design
export const responsiveWidth = (percentage: number): number => wp(percentage);
export const responsiveHeight = (percentage: number): number => hp(percentage);

// Use these for scaling based on device size
export const responsiveScale = (size: number): number => scale(size);
export const responsiveVerticalScale = (size: number): number => verticalScale(size);
export const responsiveModerateScale = (size: number, factor?: number): number => 
  moderateScale(size, factor);

// ─── Font Scaling ──────────────────────────────────────────────────────────
export const getFontSize = (size: number): number => {
  const screenSize = getScreenSize();
  
  switch (screenSize) {
    case SCREEN_SIZES.SMALL:
      return responsiveModerateScale(size * 0.9); // 10% smaller on small devices
    case SCREEN_SIZES.LARGE:
      return responsiveModerateScale(size * 1.1); // 10% larger on large devices
    default:
      return responsiveModerateScale(size);
  }
};

// ─── Spacing Scaling ───────────────────────────────────────────────────────
export const getSpacing = (spacing: number): number => {
  const screenSize = getScreenSize();
  
  switch (screenSize) {
    case SCREEN_SIZES.SMALL:
      return responsiveScale(spacing * 0.8); // 20% smaller spacing on small devices
    case SCREEN_SIZES.LARGE:
      return responsiveScale(spacing * 1.2); // 20% larger spacing on large devices
    default:
      return responsiveScale(spacing);
  }
};

// ─── Component Sizing ──────────────────────────────────────────────────────
export const getButtonHeight = (): number => {
  const screenSize = getScreenSize();
  
  switch (screenSize) {
    case SCREEN_SIZES.SMALL:
      return responsiveVerticalScale(40);
    case SCREEN_SIZES.LARGE:
      return responsiveVerticalScale(50);
    default:
      return responsiveVerticalScale(45);
  }
};

export const getInputHeight = (): number => {
  const screenSize = getScreenSize();
  
  switch (screenSize) {
    case SCREEN_SIZES.SMALL:
      return responsiveVerticalScale(40);
    case SCREEN_SIZES.LARGE:
      return responsiveVerticalScale(48);
    default:
      return responsiveVerticalScale(44);
  }
};

// ─── Grid and Layout ───────────────────────────────────────────────────────
export const getGridColumns = (): number => {
  if (isTablet()) return 3;
  if (isLargeDevice()) return 2;
  return 2; // Default for small and medium devices
};

export const getCardWidth = (): number => {
  const columns = getGridColumns();
  const padding = getSpacing(16); // Base padding
  const gap = getSpacing(12); // Gap between cards
  
  return (SCREEN_WIDTH - (padding * 2) - (gap * (columns - 1))) / columns;
};

// ─── Platform-specific Adjustments ────────────────────────────────────────
export const getPlatformSpacing = (spacing: number): number => {
  const baseSpacing = getSpacing(spacing);
  return Platform.OS === 'ios' ? baseSpacing : baseSpacing * 0.9;
};

// ─── Responsive Breakpoints ────────────────────────────────────────────────
export const BREAKPOINTS = {
  xs: 0,
  sm: 375,
  md: 414,
  lg: 768,
  xl: 1024,
} as const;

export const useBreakpoint = () => {
  if (SCREEN_WIDTH >= BREAKPOINTS.xl) return 'xl';
  if (SCREEN_WIDTH >= BREAKPOINTS.lg) return 'lg';
  if (SCREEN_WIDTH >= BREAKPOINTS.md) return 'md';
  if (SCREEN_WIDTH >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
};

// ─── Safe Area Helpers ─────────────────────────────────────────────────────
export const getStatusBarHeight = (): number => {
  return Platform.OS === 'ios' ? (SCREEN_HEIGHT >= 812 ? 44 : 20) : 0;
};

export const getBottomSafeArea = (): number => {
  return Platform.OS === 'ios' && SCREEN_HEIGHT >= 812 ? 34 : 0;
};