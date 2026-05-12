import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { authRepository } from '../../../../auth/data/AuthRepository';
import { setUser } from '../../../../auth/store/authSlice';
import { styles } from './style';

// ─── Main Screen ────────────────────────────────────────────────────────────

const SplashScreen: React.FC = () => {
    const dispatch = useDispatch();

    const logoScale   = useRef(new Animated.Value(0.5)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const wordOpacity = useRef(new Animated.Value(0)).current;
    const wordY       = useRef(new Animated.Value(16)).current;
    const tagOpacity  = useRef(new Animated.Value(0)).current;
    const tagY        = useRef(new Animated.Value(10)).current;
    const dotsOpacity = useRef(new Animated.Value(0)).current;
    const ringScale   = useRef(new Animated.Value(0.5)).current;
    const ringOpacity = useRef(new Animated.Value(0.7)).current;

    useEffect(() => {
        // Pulse ring
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(ringScale,   { toValue: 1.5, duration: 1600, easing: Easing.out(Easing.quad), useNativeDriver: true }),
                    Animated.timing(ringOpacity, { toValue: 0,   duration: 1600, easing: Easing.out(Easing.quad), useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(ringScale,   { toValue: 0.5, duration: 0, useNativeDriver: true }),
                    Animated.timing(ringOpacity, { toValue: 0.7, duration: 0, useNativeDriver: true }),
                ]),
            ])
        ).start();

        // Logo pop-in
        Animated.parallel([
            Animated.spring(logoScale,   { toValue: 1, friction: 5, tension: 90, useNativeDriver: true }),
            Animated.timing(logoOpacity, { toValue: 1, duration: 400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        ]).start();

        // Wordmark slide-up
        Animated.sequence([
            Animated.delay(280),
            Animated.parallel([
                Animated.timing(wordOpacity, { toValue: 1, duration: 400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
                Animated.timing(wordY,       { toValue: 0, duration: 400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
            ]),
        ]).start();

        // Tagline slide-up
        Animated.sequence([
            Animated.delay(480),
            Animated.parallel([
                Animated.timing(tagOpacity, { toValue: 1, duration: 400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
                Animated.timing(tagY,       { toValue: 0, duration: 400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
            ]),
        ]).start();

        // Dots fade-in
        Animated.sequence([
            Animated.delay(700),
            Animated.timing(dotsOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start();
    }, []);

    // Auth listener
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const unsub = authRepository.onAuthStateChanged((user: any) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => dispatch(setUser(user)), 2200);
        });
        return () => { unsub(); if (timer) clearTimeout(timer); };
    }, [dispatch]);

    return (
        <View style={styles.container}>
            {/* Soft background blobs */}
            <View style={styles.blobTopRight} />
            <View style={styles.blobBottomLeft} />

            {/* ── Logo area ── */}
            <View style={styles.centerBlock}>
                {/* Pulse ring */}
                <Animated.View style={[styles.pulseRing, { opacity: ringOpacity, transform: [{ scale: ringScale }] }]} />

                {/* Icon tile */}
                <Animated.View style={[styles.iconTile, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
                    <HubIcon />
                </Animated.View>

                {/* Wordmark */}
                <Animated.Text style={[styles.wordmark, { opacity: wordOpacity, transform: [{ translateY: wordY }] }]}>
                    Service<Animated.Text style={styles.wordmarkAccent}>Hub</Animated.Text>
                </Animated.Text>

                {/* Tagline */}
                <Animated.Text style={[styles.tagline, { opacity: tagOpacity, transform: [{ translateY: tagY }] }]}>
                    Your services, simplified
                </Animated.Text>
            </View>

            {/* ── Bottom dots ── */}
            <Animated.View style={[styles.dotsRow, { opacity: dotsOpacity }]}>
                <Dot delay={0} />
                <Dot delay={180} />
                <Dot delay={360} />
            </Animated.View>
        </View>
    );
};

// ─── Hub Icon ───────────────────────────────────────────────────────────────
// A clean "H" letterform with a subtle connector bar — minimal, readable, on-brand

const HubIcon: React.FC = () => (
    <View style={styles.hubIconRoot}>
        {/* Left pillar */}
        <View style={styles.pillar} />
        {/* Cross bar */}
        <View style={styles.crossBar} />
        {/* Right pillar */}
        <View style={styles.pillar} />
    </View>
);

// ─── Pulsing Dot ────────────────────────────────────────────────────────────

const Dot: React.FC<{ delay: number }> = ({ delay }) => {
    const scale   = useRef(new Animated.Value(0.6)).current;
    const opacity = useRef(new Animated.Value(0.35)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.parallel([
                    Animated.timing(scale,   { toValue: 1,    duration: 380, useNativeDriver: true }),
                    Animated.timing(opacity, { toValue: 1,    duration: 380, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(scale,   { toValue: 0.6,  duration: 380, useNativeDriver: true }),
                    Animated.timing(opacity, { toValue: 0.35, duration: 380, useNativeDriver: true }),
                ]),
                Animated.delay(540 - delay),
            ])
        ).start();
    }, []);

    return <Animated.View style={[styles.dot, { opacity, transform: [{ scale }] }]} />;
};

export default SplashScreen;
