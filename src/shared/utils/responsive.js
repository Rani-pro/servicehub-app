"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBottomSafeArea = exports.getStatusBarHeight = exports.useBreakpoint = exports.BREAKPOINTS = exports.getPlatformSpacing = exports.getCardWidth = exports.getGridColumns = exports.getInputHeight = exports.getButtonHeight = exports.getSpacing = exports.getFontSize = exports.responsiveModerateScale = exports.responsiveVerticalScale = exports.responsiveScale = exports.responsiveHeight = exports.responsiveWidth = exports.isLargeDevice = exports.isSmallDevice = exports.isTablet = exports.getScreenSize = exports.SCREEN_SIZES = void 0;
var react_native_responsive_screen_1 = require("react-native-responsive-screen");
var react_native_size_matters_1 = require("react-native-size-matters");
var react_native_1 = require("react-native");
var _a = react_native_1.Dimensions.get('window'), SCREEN_WIDTH = _a.width, SCREEN_HEIGHT = _a.height;
// ─── Screen Size Categories ────────────────────────────────────────────────
exports.SCREEN_SIZES = {
    SMALL: 'small', // < 375px width (iPhone SE, small Android)
    MEDIUM: 'medium', // 375-414px width (iPhone 12, most phones)
    LARGE: 'large', // > 414px width (iPhone Plus, large Android, tablets)
};
// ─── Device Detection ──────────────────────────────────────────────────────
var getScreenSize = function () {
    if (SCREEN_WIDTH < 375)
        return exports.SCREEN_SIZES.SMALL;
    if (SCREEN_WIDTH <= 414)
        return exports.SCREEN_SIZES.MEDIUM;
    return exports.SCREEN_SIZES.LARGE;
};
exports.getScreenSize = getScreenSize;
var isTablet = function () {
    return SCREEN_WIDTH >= 768;
};
exports.isTablet = isTablet;
var isSmallDevice = function () {
    return (0, exports.getScreenSize)() === exports.SCREEN_SIZES.SMALL;
};
exports.isSmallDevice = isSmallDevice;
var isLargeDevice = function () {
    return (0, exports.getScreenSize)() === exports.SCREEN_SIZES.LARGE || (0, exports.isTablet)();
};
exports.isLargeDevice = isLargeDevice;
// ─── Responsive Dimensions ─────────────────────────────────────────────────
// Use these for width-based responsive design
var responsiveWidth = function (percentage) { return (0, react_native_responsive_screen_1.widthPercentageToDP)(percentage); };
exports.responsiveWidth = responsiveWidth;
var responsiveHeight = function (percentage) { return (0, react_native_responsive_screen_1.heightPercentageToDP)(percentage); };
exports.responsiveHeight = responsiveHeight;
// Use these for scaling based on device size
var responsiveScale = function (size) { return (0, react_native_size_matters_1.scale)(size); };
exports.responsiveScale = responsiveScale;
var responsiveVerticalScale = function (size) { return (0, react_native_size_matters_1.verticalScale)(size); };
exports.responsiveVerticalScale = responsiveVerticalScale;
var responsiveModerateScale = function (size, factor) {
    return (0, react_native_size_matters_1.moderateScale)(size, factor);
};
exports.responsiveModerateScale = responsiveModerateScale;
// ─── Font Scaling ──────────────────────────────────────────────────────────
var getFontSize = function (size) {
    var screenSize = (0, exports.getScreenSize)();
    switch (screenSize) {
        case exports.SCREEN_SIZES.SMALL:
            return (0, exports.responsiveModerateScale)(size * 0.9); // 10% smaller on small devices
        case exports.SCREEN_SIZES.LARGE:
            return (0, exports.responsiveModerateScale)(size * 1.1); // 10% larger on large devices
        default:
            return (0, exports.responsiveModerateScale)(size);
    }
};
exports.getFontSize = getFontSize;
// ─── Spacing Scaling ───────────────────────────────────────────────────────
var getSpacing = function (spacing) {
    var screenSize = (0, exports.getScreenSize)();
    switch (screenSize) {
        case exports.SCREEN_SIZES.SMALL:
            return (0, exports.responsiveScale)(spacing * 0.8); // 20% smaller spacing on small devices
        case exports.SCREEN_SIZES.LARGE:
            return (0, exports.responsiveScale)(spacing * 1.2); // 20% larger spacing on large devices
        default:
            return (0, exports.responsiveScale)(spacing);
    }
};
exports.getSpacing = getSpacing;
// ─── Component Sizing ──────────────────────────────────────────────────────
var getButtonHeight = function () {
    var screenSize = (0, exports.getScreenSize)();
    switch (screenSize) {
        case exports.SCREEN_SIZES.SMALL:
            return (0, exports.responsiveVerticalScale)(48); // Consistent with input height
        case exports.SCREEN_SIZES.LARGE:
            return (0, exports.responsiveVerticalScale)(60); // Slightly larger for better presence
        default:
            return (0, exports.responsiveVerticalScale)(54); // Better proportion
    }
};
exports.getButtonHeight = getButtonHeight;
var getInputHeight = function () {
    var screenSize = (0, exports.getScreenSize)();
    switch (screenSize) {
        case exports.SCREEN_SIZES.SMALL:
            return (0, exports.responsiveVerticalScale)(48); // Increased for better touch target
        case exports.SCREEN_SIZES.LARGE:
            return (0, exports.responsiveVerticalScale)(56); // Increased for better proportions
        default:
            return (0, exports.responsiveVerticalScale)(52); // Increased for better UX
    }
};
exports.getInputHeight = getInputHeight;
// ─── Grid and Layout ───────────────────────────────────────────────────────
var getGridColumns = function () {
    if ((0, exports.isTablet)())
        return 3;
    if ((0, exports.isLargeDevice)())
        return 2;
    return 2; // Default for small and medium devices
};
exports.getGridColumns = getGridColumns;
var getCardWidth = function () {
    var columns = (0, exports.getGridColumns)();
    var padding = (0, exports.getSpacing)(16); // Base padding
    var gap = (0, exports.getSpacing)(12); // Gap between cards
    return (SCREEN_WIDTH - (padding * 2) - (gap * (columns - 1))) / columns;
};
exports.getCardWidth = getCardWidth;
// ─── Platform-specific Adjustments ────────────────────────────────────────
var getPlatformSpacing = function (spacing) {
    var baseSpacing = (0, exports.getSpacing)(spacing);
    return react_native_1.Platform.OS === 'ios' ? baseSpacing : baseSpacing * 0.9;
};
exports.getPlatformSpacing = getPlatformSpacing;
// ─── Responsive Breakpoints ────────────────────────────────────────────────
exports.BREAKPOINTS = {
    xs: 0,
    sm: 375,
    md: 414,
    lg: 768,
    xl: 1024,
};
var useBreakpoint = function () {
    if (SCREEN_WIDTH >= exports.BREAKPOINTS.xl)
        return 'xl';
    if (SCREEN_WIDTH >= exports.BREAKPOINTS.lg)
        return 'lg';
    if (SCREEN_WIDTH >= exports.BREAKPOINTS.md)
        return 'md';
    if (SCREEN_WIDTH >= exports.BREAKPOINTS.sm)
        return 'sm';
    return 'xs';
};
exports.useBreakpoint = useBreakpoint;
// ─── Safe Area Helpers ─────────────────────────────────────────────────────
var getStatusBarHeight = function () {
    return react_native_1.Platform.OS === 'ios' ? (SCREEN_HEIGHT >= 812 ? 44 : 20) : 0;
};
exports.getStatusBarHeight = getStatusBarHeight;
var getBottomSafeArea = function () {
    return react_native_1.Platform.OS === 'ios' && SCREEN_HEIGHT >= 812 ? 34 : 0;
};
exports.getBottomSafeArea = getBottomSafeArea;
