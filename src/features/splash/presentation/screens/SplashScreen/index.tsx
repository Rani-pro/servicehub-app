import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { authRepository } from '../../../../auth/data/AuthRepository';
import { setUser } from '../../../../auth/store/authSlice';
import { styles } from './style';

const SplashScreen: React.FC = () => {
    const dispatch = useDispatch();

    // Animation values
    const logoScale = useRef(new Animated.Value(0.6)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const taglineOpacity = useRef(new Animated.Value(0)).current;
    const taglineTranslateY = useRef(new Animated.Value(12)).current;
    const dotOpacity = useRef(new Animated.Value(0)).current;
    const ringScale = useRef(new Animated.Value(0.4)).current;
    const ringOpacity = useRef(new Animated.Value(0.6)).current;

    useEffect(() => {
        // Ring pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(ringScale, { toValue: 1.3, duration: 1400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
                    Animated.timing(ringOpacity, { toValue: 0, duration: 1400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(ringScale, { toValue: 0.4, duration: 0, useNativeDriver: true }),
                    Animated.timing(ringOpacity, { toValue: 0.6, duration: 0, useNativeDriver: true }),
                ]),
            ])
        ).start();

        // Logo entrance
        Animated.parallel([
            Animated.spring(logoScale, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
            Animated.timing(logoOpacity, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        ]).start();

        // Tagline entrance (delayed)
        Animated.sequence([
            Animated.delay(350),
            Animated.parallel([
                Animated.timing(taglineOpacity, { toValue: 1, duration: 450, easing: Easing.out(Easing.ease), useNativeDriver: true }),
                Animated.timing(taglineTranslateY, { toValue: 0, duration: 450, easing: Easing.out(Easing.ease), useNativeDriver: true }),
            ]),
        ]).start();

        // Dot loader entrance
        Animated.sequence([
            Animated.delay(600),
            Animated.timing(dotOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start();
    }, []);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        const unsubscribe = authRepository.onAuthStateChanged((user: any) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                dispatch(setUser(user));
            }, 2000);
        });
        return () => {
            unsubscribe();
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [dispatch]);

    return (
        <View style={styles.container}>
            {/* Background decorative circles */}
            <View style={styles.bgCircleTopRight} />
            <View style={styles.bgCircleBottomLeft} />

            {/* Center content */}
            <View style={styles.centerContent}>
                {/* Pulsing ring behind logo */}
                <Animated.View
                    style={[
                        styles.pulseRing,
                        { opacity: ringOpacity, transform: [{ scale: ringScale }] },
                    ]}
                />

                {/* Logo mark */}
                <Animated.View
                    style={[
                        styles.logoMark,
                        { opacity: logoOpacity, transform: [{ scale: logoScale }] },
                    ]}
                >
                    {/* Wrench + gear icon built with views */}
                    <ServiceIcon />
                </Animated.View>

                {/* App name */}
                <Animated.Text
                    style={[styles.appName, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
                >
                    Service<Animated.Text style={styles.appNameAccent}>Hub</Animated.Text>
                </Animated.Text>

                {/* Tagline */}
                <Animated.Text
                    style={[
                        styles.tagline,
                        { opacity: taglineOpacity, transform: [{ translateY: taglineTranslateY }] },
                    ]}
                >
                    Your services, simplified
                </Animated.Text>
            </View>

            {/* Bottom loader dots */}
            <Animated.View style={[styles.loaderRow, { opacity: dotOpacity }]}>
                <PulsingDot delay={0} />
                <PulsingDot delay={200} />
                <PulsingDot delay={400} />
            </Animated.View>
        </View>
    );
};

// Minimal SVG-style service icon using Views
const ServiceIcon: React.FC = () => (
    <View style={styles.iconWrapper}>
        {/* Gear outer ring */}
        <View style={styles.gearOuter}>
            <View style={styles.gearInner} />
            {/* Gear teeth */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <View
                    key={i}
                    style={[
                        styles.gearTooth,
                        { transform: [{ rotate: `${deg}deg` }, { translateY: -18 }] },
                    ]}
                />
            ))}
        </View>
        {/* Wrench handle */}
        <View style={styles.wrenchHandle} />
    </View>
);

// Animated pulsing dot
const PulsingDot: React.FC<{ delay: number }> = ({ delay }) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.3, duration: 400, useNativeDriver: true }),
                Animated.delay(600 - delay),
            ])
        ).start();
    }, []);

    return <Animated.View style={[styles.dot, { opacity }]} />;
};

export default SplashScreen;
