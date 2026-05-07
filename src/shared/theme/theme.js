"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shadows = exports.ComponentSizes = exports.Typography = exports.Spacing = exports.Colors = exports.DarkColors = exports.LightColors = void 0;
var responsive_1 = require("../utils/responsive");
exports.LightColors = {
    primary: '#22C55E',
    secondary: '#16A34A',
    background: '#FFFFFF',
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
exports.DarkColors = {
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
exports.Colors = exports.LightColors;
// ─── Responsive Spacing ────────────────────────────────────────────────────
exports.Spacing = {
    xs: (0, responsive_1.getSpacing)(4),
    s: (0, responsive_1.getSpacing)(8),
    m: (0, responsive_1.getSpacing)(16),
    l: (0, responsive_1.getSpacing)(24),
    xl: (0, responsive_1.getSpacing)(32),
    xxl: (0, responsive_1.getSpacing)(40),
};
// ─── Responsive Typography ─────────────────────────────────────────────────
exports.Typography = {
    h1: {
        fontSize: (0, responsive_1.getFontSize)(32),
        fontWeight: 'bold',
        lineHeight: (0, responsive_1.getFontSize)(40),
    },
    h2: {
        fontSize: (0, responsive_1.getFontSize)(28),
        fontWeight: 'bold',
        lineHeight: (0, responsive_1.getFontSize)(36),
    },
    h3: {
        fontSize: (0, responsive_1.getFontSize)(24),
        fontWeight: '600',
        lineHeight: (0, responsive_1.getFontSize)(32),
    },
    h4: {
        fontSize: (0, responsive_1.getFontSize)(20),
        fontWeight: '600',
        lineHeight: (0, responsive_1.getFontSize)(28),
    },
    body: {
        fontSize: (0, responsive_1.getFontSize)(16),
        fontWeight: '400',
        lineHeight: (0, responsive_1.getFontSize)(24),
    },
    bodySmall: {
        fontSize: (0, responsive_1.getFontSize)(14),
        fontWeight: '400',
        lineHeight: (0, responsive_1.getFontSize)(20),
    },
    caption: {
        fontSize: (0, responsive_1.getFontSize)(12),
        fontWeight: '400',
        lineHeight: (0, responsive_1.getFontSize)(16),
    },
    button: {
        fontSize: (0, responsive_1.getFontSize)(16),
        fontWeight: '600',
        lineHeight: (0, responsive_1.getFontSize)(20),
    },
};
// ─── Responsive Component Dimensions ───────────────────────────────────────
exports.ComponentSizes = {
    button: {
        height: (0, responsive_1.getButtonHeight)(),
        borderRadius: (0, responsive_1.responsiveScale)(8),
        paddingHorizontal: (0, responsive_1.getSpacing)(16),
    },
    input: {
        height: (0, responsive_1.getInputHeight)(),
        borderRadius: (0, responsive_1.responsiveScale)(8),
        paddingHorizontal: (0, responsive_1.getSpacing)(16),
    },
    card: {
        borderRadius: (0, responsive_1.responsiveScale)(12),
        padding: (0, responsive_1.getSpacing)(16),
    },
    icon: {
        small: (0, responsive_1.responsiveScale)(16),
        medium: (0, responsive_1.responsiveScale)(24),
        large: (0, responsive_1.responsiveScale)(32),
        xlarge: (0, responsive_1.responsiveScale)(40),
    },
};
// ─── Shadow Styles ─────────────────────────────────────────────────────────
exports.Shadows = {
    small: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: (0, responsive_1.responsiveVerticalScale)(1),
        },
        shadowOpacity: 0.1,
        shadowRadius: (0, responsive_1.responsiveScale)(2),
        elevation: 2,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: (0, responsive_1.responsiveVerticalScale)(2),
        },
        shadowOpacity: 0.1,
        shadowRadius: (0, responsive_1.responsiveScale)(4),
        elevation: 4,
    },
    large: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: (0, responsive_1.responsiveVerticalScale)(4),
        },
        shadowOpacity: 0.15,
        shadowRadius: (0, responsive_1.responsiveScale)(8),
        elevation: 8,
    },
};
