import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import CrashlyticsUtils from '../utils/crashlytics';

const CrashlyticsTestButton: React.FC = () => {
  const handleTestCrash = () => {
    Alert.alert(
      'Test Crash',
      'This will crash the app immediately. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Crash App',
          style: 'destructive',
          onPress: () => {
            // Log before crash
            CrashlyticsUtils.log('User initiated test crash');
            CrashlyticsUtils.setAttribute('test_crash', 'true');
            
            // Force crash
            CrashlyticsUtils.testCrash();
          }
        }
      ]
    );
  };

  const handleTestNonFatalError = () => {
    try {
      // Simulate a non-fatal error
      throw new Error('Test non-fatal error from React Native');
    } catch (error) {
      CrashlyticsUtils.recordError(error as Error);
      Alert.alert('Non-Fatal Error', 'A non-fatal error has been logged to Crashlytics');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.crashButton} onPress={handleTestCrash}>
        <Text style={styles.buttonText}>Test Crash (Fatal)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.errorButton} onPress={handleTestNonFatalError}>
        <Text style={styles.buttonText}>Test Non-Fatal Error</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  crashButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  errorButton: {
    backgroundColor: '#ff8800',
    padding: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CrashlyticsTestButton;