import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  message: string;
}

export const EmptyState: React.FC<Props> = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24
  },
  message: {
    color: '#6b7280'
  }
});
