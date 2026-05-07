import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  isTablet,
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
  isLandscape: boolean;
}

export const useResponsive = (): ResponsiveInfo => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  return useMemo(() => {
    const isLandscape = screenWidth > screenHeight;

    const getScreenSize = (): ScreenSize => {
      if (screenWidth < 375) return SCREEN_SIZES.SMALL;
      if (screenWidth <= 414) return SCREEN_SIZES.MEDIUM;
      return SCREEN_SIZES.LARGE;
    };

    const screenSize = getScreenSize();
    const tablet = screenWidth >= 768;
    const small = screenSize === SCREEN_SIZES.SMALL;
    const large = screenSize === SCREEN_SIZES.LARGE || tablet;

    const getGridColumns = () => {
      if (tablet) return isLandscape ? 4 : 3;
      if (large) return isLandscape ? 3 : 2;
      return isLandscape ? 3 : 2;
    };

    const gridColumns = getGridColumns();
    const padding = 16;
    const gap = 12;
    const cardWidth = (screenWidth - padding * 2 - gap * (gridColumns - 1)) / gridColumns;

    const getBreakpoint = () => {
      if (screenWidth >= 1024) return 'xl';
      if (screenWidth >= 768) return 'lg';
      if (screenWidth >= 414) return 'md';
      if (screenWidth >= 375) return 'sm';
      return 'xs';
    };

    return {
      screenSize,
      isTablet: tablet,
      isSmallDevice: small,
      isLargeDevice: large,
      gridColumns,
      cardWidth,
      breakpoint: getBreakpoint(),
      screenWidth,
      screenHeight,
      isLandscape,
    };
  }, [screenWidth, screenHeight]);
};

// Hook for responsive values based on screen size
export const useResponsiveValue = <T>(values: {
  small?: T;
  medium?: T;
  large?: T;
  tablet?: T;
  default: T;
}): T => {
  const { screenSize, isTablet: tablet } = useResponsive();

  return useMemo(() => {
    if (tablet && values.tablet !== undefined) {
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
  }, [screenSize, tablet, values]);
};