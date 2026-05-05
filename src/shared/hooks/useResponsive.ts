import { useMemo } from 'react';
import { Dimensions } from 'react-native';
import {
  getScreenSize,
  isTablet,
  isSmallDevice,
  isLargeDevice,
  getGridColumns,
  getCardWidth,
  useBreakpoint,
  SCREEN_SIZES,
  type ScreenSize,
} from '../utils/responsive';

export interface ResponsiveInfo {
  screenSize: ScreenSize;
  isTablet: boolean;
  isSmallDevice: boolean;
  isLargeDevice: boolean;
  gridColumns: number;
  cardWidth: number;
  breakpoint: string;
  screenWidth: number;
  screenHeight: number;
}

export const useResponsive = (): ResponsiveInfo => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  return useMemo(() => ({
    screenSize: getScreenSize(),
    isTablet: isTablet(),
    isSmallDevice: isSmallDevice(),
    isLargeDevice: isLargeDevice(),
    gridColumns: getGridColumns(),
    cardWidth: getCardWidth(),
    breakpoint: useBreakpoint(),
    screenWidth,
    screenHeight,
  }), [screenWidth, screenHeight]);
};

// Hook for responsive values based on screen size
export const useResponsiveValue = <T>(values: {
  small?: T;
  medium?: T;
  large?: T;
  tablet?: T;
  default: T;
}): T => {
  const { screenSize, isTablet } = useResponsive();

  return useMemo(() => {
    if (isTablet && values.tablet !== undefined) {
      return values.tablet;
    }

    switch (screenSize) {
      case SCREEN_SIZES.SMALL:
        return values.small ?? values.default;
      case SCREEN_SIZES.MEDIUM:
        return values.medium ?? values.default;
      case SCREEN_SIZES.LARGE:
        return values.large ?? values.default;
      default:
        return values.default;
    }
  }, [screenSize, isTablet, values]);
};