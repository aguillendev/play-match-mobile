import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const LoadingState: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#16a34a" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24
  }
});
