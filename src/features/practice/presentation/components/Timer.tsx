import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Timer.style';

interface TimerProps {
    label: string;
}

const Timer: React.FC<TimerProps> = ({ label }) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            if (interval) clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds]);

    const toggle = () => setIsActive(!isActive);
    const reset = () => {
        setSeconds(0);
        setIsActive(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.timeText}>{seconds}s</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, isActive ? styles.stopButton : styles.startButton]}
                    onPress={toggle}
                >
                    <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resetButton} onPress={reset}>
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Timer;
