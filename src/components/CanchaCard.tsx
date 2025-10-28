import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Cancha } from '@/types';

interface Props {
  cancha: Cancha;
  onPress?: () => void;
}

export const CanchaCard: React.FC<Props> = ({ cancha, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{cancha.nombre}</Text>
        <Text style={styles.distance}>{cancha.distanciaKm.toFixed(1)} km</Text>
      </View>
      <Text style={styles.subtitle}>Tipo: {cancha.tipo.replace('_', ' ')}</Text>
      <Text style={styles.price}>${cancha.precioPorHora.toFixed(2)} / hora</Text>
      {cancha.servicios && (
        <Text style={styles.services}>{cancha.servicios.join(' • ')}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  distance: {
    fontSize: 14,
    color: '#6b7280'
  },
  subtitle: {
    fontSize: 14,
    color: '#4b5563'
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  services: {
    fontSize: 12,
    color: '#6b7280'
  }
});
