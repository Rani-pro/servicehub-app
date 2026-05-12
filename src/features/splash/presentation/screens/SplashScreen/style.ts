import { Dimensions, StyleSheet } from 'react-native';
import { FontFamily } from '../../../../../shared/theme/theme';
import { getFontSize } from '../../../../../shared/utils/responsive';

const { width, height } = Dimensions.get('window');

const GREEN       = '#22C55E';
const GREEN_DARK  = '#16A34A';
const WHITE       = '#FFFFFF';
const TEXT        = '#111827';
const TEXT_MUTED  = '#6B7280';

export const styles = StyleSheet.create({

    // ── Screen ──────────────────────────────────────────────────────────────
    container: {
        flex: 1,
        backgroundColor: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ── Background blobs ────────────────────────────────────────────────────
    blobTopRight: {
        position: 'absolute',
        top: -(width * 0.3),
        right: -(width * 0.3),
        width: width * 0.75,
        height: width * 0.75,
        borderRadius: width * 0.375,
        backgroundColor: GREEN,
        opacity: 0.07,
    },
    blobBottomLeft: {
        position: 'absolute',
        bottom: -(width * 0.35),
        left: -(width * 0.35),
        width: width * 0.85,
        height: width * 0.85,
        borderRadius: width * 0.425,
        backgroundColor: GREEN,
        opacity: 0.05,
    },

    // ── Center block ─────────────────────────────────────────────────────────
    centerBlock: {
        alignItems: 'center',
    },

    // ── Pulse ring ───────────────────────────────────────────────────────────
    pulseRing: {
        position: 'absolute',
        width: 128,
        height: 128,
        borderRadius: 64,
        borderWidth: 2,
        borderColor: GREEN,
    },

    // ── Icon tile ────────────────────────────────────────────────────────────
    iconTile: {
        width: 92,
        height: 92,
        borderRadius: 26,
        backgroundColor: GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
        // Shadow
        shadowColor: GREEN_DARK,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.38,
        shadowRadius: 20,
        elevation: 14,
    },

    // ── Hub "H" icon ─────────────────────────────────────────────────────────
    hubIconRoot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
    },
    pillar: {
        width: 7,
        height: 36,
        borderRadius: 4,
        backgroundColor: WHITE,
    },
    crossBar: {
        width: 14,
        height: 6,
        borderRadius: 3,
        backgroundColor: WHITE,
        marginHorizontal: 3,
    },

    // ── Wordmark ─────────────────────────────────────────────────────────────
    wordmark: {
        fontSize: getFontSize(38),
        fontWeight: '700',
        fontFamily: FontFamily.bold,
        color: TEXT,
        letterSpacing: -0.8,
        lineHeight: getFontSize(46),
    },
    wordmarkAccent: {
        color: GREEN,
        fontWeight: '800',
        fontFamily: FontFamily.bold,
    },

    // ── Tagline ──────────────────────────────────────────────────────────────
    tagline: {
        fontSize: getFontSize(15),
        color: TEXT_MUTED,
        marginTop: 6,
        fontWeight: '400',
        fontFamily: FontFamily.regular,
        letterSpacing: 0.15,
    },

    // ── Bottom dots ──────────────────────────────────────────────────────────
    dotsRow: {
        position: 'absolute',
        bottom: height * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: GREEN,
    },
});
