import { Platform } from 'react-native';
import { 
  getFontSize, 
  getSpacing, 
  getButtonHeight, 
  getInputHeight,
  responsiveScale,
  responsiveVerticalScale 
} from '../utils/responsive';

// ─── Font Families ─────────────────────────────────────────────────────────
export const FontFamily = {
    regular: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    medium: Platform.select({ ios: 'System', android: 'Roboto-Medium', default: 'System' }),
    semiBold: Platform.select({ ios: 'System', android: 'Roboto-Medium', default: 'System' }),
    bold: Platform.select({ ios: 'System', android: 'Roboto-Bold', default: 'System' }),
    mono: Platform.select({ ios: 'Courier New', android: 'monospace', default: 'monospace' }),
};

export type ThemeMode = 'light' | 'dark';

export const LightColors = {
    primary: '#22C55E',
    secondary: '#16A34A',
    background: '#F9FAFB',
    secondaryBackground: '#F3F4F6',
    text: '#111827',
    textSecondary: '#4B5563',
    white: '#FFFFFF',
    danger: '#EF4444',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#22C55E',
    border: '#E5E7EB',
    shadow: '#000000',
};

export const DarkColors = {
    primary: '#22C55E',
    secondary: '#16A34A',
    background: '#111827',
    secondaryBackground: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    white: '#1F2937',
    danger: '#F87171',
    error: '#F87171',
    warning: '#FBBF24',
    success: '#34D399',
    border: '#374151',
    shadow: '#000000',
};

// Default colors for backward compatibility (defaults to light)
export const Colors = LightColors;

// ─── Responsive Spacing ────────────────────────────────────────────────────
export const Spacing = {
    xs: getSpacing(4),
    s: getSpacing(8),
    m: getSpacing(16),
    l: getSpacing(24),
    xl: getSpacing(32),
    xxl: getSpacing(40),
};

// ─── Responsive Typography ─────────────────────────────────────────────────
export const Typography = {
    h1: {
        fontSize: getFontSize(32),
        fontWeight: 'bold' as const,
        fontFamily: FontFamily.bold,
        lineHeight: getFontSize(40),
    },
    h2: {
        fontSize: getFontSize(28),
        fontWeight: 'bold' as const,
        fontFamily: FontFamily.bold,
        lineHeight: getFontSize(36),
    },
    h3: {
        fontSize: getFontSize(24),
        fontWeight: '600' as const,
        fontFamily: FontFamily.semiBold,
        lineHeight: getFontSize(32),
    },
    h4: {
        fontSize: getFontSize(20),
        fontWeight: '600' as const,
        fontFamily: FontFamily.semiBold,
        lineHeight: getFontSize(28),
    },
    body: {
        fontSize: getFontSize(16),
        fontWeight: '400' as const,
        fontFamily: FontFamily.regular,
        lineHeight: getFontSize(24),
    },
    bodySmall: {
        fontSize: getFontSize(14),
        fontWeight: '400' as const,
        fontFamily: FontFamily.regular,
        lineHeight: getFontSize(20),
    },
    caption: {
        fontSize: getFontSize(12),
        fontWeight: '400' as const,
        fontFamily: FontFamily.regular,
        lineHeight: getFontSize(16),
    },
    button: {
        fontSize: getFontSize(16),
        fontWeight: '600' as const,
        fontFamily: FontFamily.semiBold,
        lineHeight: getFontSize(20),
    },
};

// ─── Responsive Component Dimensions ───────────────────────────────────────
export const ComponentSizes = {
    button: {
        height: getButtonHeight(),
        borderRadius: responsiveScale(8),
        paddingHorizontal: getSpacing(16),
    },
    input: {
        height: getInputHeight(),
        borderRadius: responsiveScale(8),
        paddingHorizontal: getSpacing(16),
    },
    card: {
        borderRadius: responsiveScale(10),
        padding: getSpacing(12),
    },
    icon: {
        small: responsiveScale(16),
        medium: responsiveScale(24),
        large: responsiveScale(32),
        xlarge: responsiveScale(40),
    },
};

// ─── Shadow Styles ─────────────────────────────────────────────────────────
export const Shadows = {
    small: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: responsiveVerticalScale(1),
        },
        shadowOpacity: 0.1,
        shadowRadius: responsiveScale(2),
        elevation: 2,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: responsiveVerticalScale(2),
        },
        shadowOpacity: 0.1,
        shadowRadius: responsiveScale(4),
        elevation: 4,
    },
    large: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: responsiveVerticalScale(4),
        },
        shadowOpacity: 0.15,
        shadowRadius: responsiveScale(8),
        elevation: 8,
    },
};

