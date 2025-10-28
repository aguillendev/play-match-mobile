import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Partido } from '@/types';

interface Props {
  partido: Partido;
  onJoin?: (partidoId: string) => void | Promise<void>;
}

export const PartidoCard: React.FC<Props> = ({ partido, onJoin }) => {
  return (
    <Pressable style={styles.card} onPress={() => onJoin?.(partido.id)}>
      <View style={styles.header}>
        <Text style={styles.title}>Partido en cancha {partido.canchaId.toUpperCase()}</Text>
        <Text style={styles.date}>{new Date(partido.fecha).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.time}>
        {partido.horaInicio} - {partido.horaFin}
      </Text>
      <Text style={styles.info}>Creador: {partido.creador}</Text>
      <Text style={styles.info}>
        Cupos: {partido.jugadoresConfirmados}/{partido.cupoMaximo}
      </Text>
      {partido.notas && <Text style={styles.notes}>Nota: {partido.notas}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  date: {
    fontSize: 14,
    color: '#6b7280'
  },
  time: {
    fontSize: 14,
    fontWeight: '500'
  },
  info: {
    fontSize: 13,
    color: '#374151'
  },
  notes: {
    fontSize: 12,
    color: '#6b7280'
  }
});
