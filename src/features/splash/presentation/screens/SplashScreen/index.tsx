import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import { authRepository } from '../../../../auth/data/AuthRepository';
import { setUser } from '../../../../auth/store/authSlice';

const SplashScreen: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
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
            <View style={styles.logoContainer}>
                {/* Placeholder for logo - use real logo if available */}
                <Text style={styles.logoText}>MYAPP</Text>
                <Text style={styles.tagline}></Text>
            </View>
            <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
        </View>
    );
};

export default SplashScreen;
