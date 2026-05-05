import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Environment, EnvironmentUtils } from '../config';

/**
 * Development banner to show current environment
 * Only visible in non-production builds
 */
const EnvironmentBanner: React.FC = () => {
  // Only show in staging or development
  if (EnvironmentUtils.isProduction()) {
    return null;
  }

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>
        🚧 {Environment.APP_NAME} - {Environment.ENVIRONMENT.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FF6B35',
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default EnvironmentBanner;