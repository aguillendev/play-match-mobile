import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  message: string;
  onRetry?: () => void | Promise<void>;
  retryLabel?: string;
}

export const ErrorState: React.FC<Props> = ({ message, onRetry, retryLabel = 'Reintentar' }) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = useCallback(() => {
    if (!onRetry || isRetrying) {
      return;
    }

    try {
      setIsRetrying(true);
      const maybePromise = onRetry();

      if (maybePromise && typeof (maybePromise as Promise<unknown>).then === 'function') {
        void (maybePromise as Promise<unknown>).finally(() => setIsRetrying(false));
      } else {
        setIsRetrying(false);
      }
    } catch (error) {
      setIsRetrying(false);
      throw error;
    }
  }, [onRetry, isRetrying]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Pressable
          style={[styles.button, isRetrying && styles.buttonDisabled]}
          onPress={handleRetry}
          disabled={isRetrying}
        >
          {isRetrying ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{retryLabel}</Text>
          )}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12
  },
  message: {
    color: '#b91c1c',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999
  },
  buttonDisabled: {
    opacity: 0.7
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  }
});
