import { Dimensions, StyleSheet } from 'react-native';
import { LightColors } from '../../../../../shared/theme/theme';

const { width, height } = Dimensions.get('window');

// Use light colors as base (splash always shows on light bg for brand consistency)
const C = LightColors;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // ── Decorative background circles ──────────────────────────────────────
    bgCircleTopRight: {
        position: 'absolute',
        top: -width * 0.25,
        right: -width * 0.25,
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: width * 0.35,
        backgroundColor: C.primary,
        opacity: 0.08,
    },
    bgCircleBottomLeft: {
        position: 'absolute',
        bottom: -width * 0.3,
        left: -width * 0.3,
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: C.primary,
        opacity: 0.06,
    },

    // ── Center content ─────────────────────────────────────────────────────
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ── Pulse ring ─────────────────────────────────────────────────────────
    pulseRing: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: C.primary,
    },

    // ── Logo mark container ────────────────────────────────────────────────
    logoMark: {
        width: 88,
        height: 88,
        borderRadius: 24,
        backgroundColor: C.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: C.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 12,
        marginBottom: 20,
    },

    // ── App name ───────────────────────────────────────────────────────────
    appName: {
        fontSize: 36,
        fontWeight: '700',
        color: '#111827',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    appNameAccent: {
        color: C.primary,
        fontWeight: '800',
    },

    // ── Tagline ────────────────────────────────────────────────────────────
    tagline: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: '400',
        letterSpacing: 0.3,
        marginTop: 4,
    },

    // ── Bottom loader row ──────────────────────────────────────────────────
    loaderRow: {
        position: 'absolute',
        bottom: 56,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: C.primary,
    },

    // ── Icon internals ─────────────────────────────────────────────────────
    iconWrapper: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gearOuter: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 4,
        left: 8,
    },
    gearInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: C.primary,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    gearTooth: {
        position: 'absolute',
        width: 5,
        height: 10,
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
    },
    wrenchHandle: {
        position: 'absolute',
        bottom: 4,
        right: 6,
        width: 5,
        height: 22,
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        transform: [{ rotate: '-40deg' }],
    },

    // Legacy compat
    logoContainer: {
        alignItems: 'center',
    },
    logoText: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 4,
    },
    loader: {
        position: 'absolute',
        bottom: 50,
    },
});
