import React, { useMemo } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { mockCanchas } from '@/mocks/canchas';
import { useReservas } from '@/hooks/useReservas';
import { HomeStackParamList } from '@/navigation/AppNavigator';
import { usePlayerStore } from '@/store/usePlayerStore';

const ReservarScreen: React.FC = () => {
  const { params } = useRoute<RouteProp<HomeStackParamList, 'Reservar'>>();
  const { horariosDisponibles, reservarCancha, isLoading } = useReservas();
  const addReserva = usePlayerStore((state) => state.addReserva);

  const cancha = useMemo(
    () => mockCanchas.find((item) => item.id === params.canchaId),
    [params.canchaId]
  );

  if (!cancha) {
    return (
      <View style={styles.centered}>
        <Text>Cancha no encontrada</Text>
      </View>
    );
  }

  const horarios = horariosDisponibles[cancha.id] ?? [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Selecciona un horario</Text>
      <View style={styles.scheduleList}>
        {horarios.map((horario) => (
          <Pressable
            key={horario.id}
            style={[styles.scheduleItem, !horario.disponible && styles.scheduleItemDisabled]}
            disabled={!horario.disponible || isLoading}
            onPress={() =>
              reservarCancha(cancha.id, horario)
                .then((reserva) => {
                  addReserva(reserva);
                })
                .catch(() => {
                  // handled inside hook
                })
            }
          >
            <Text style={styles.scheduleText}>
              {horario.horaInicio} - {horario.horaFin}
            </Text>
            <Text style={styles.scheduleStatus}>
              {horario.disponible ? 'Disponible' : 'No disponible'}
            </Text>
          </Pressable>
        ))}
      </View>
      {horarios.length === 0 && <Text style={styles.empty}>No hay horarios disponibles.</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '600'
  },
  scheduleList: {
    gap: 12
  },
  scheduleItem: {
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#16a34a',
    gap: 4
  },
  scheduleItemDisabled: {
    opacity: 0.4
  },
  scheduleText: {
    fontSize: 16,
    fontWeight: '500'
  },
  scheduleStatus: {
    fontSize: 14,
    color: '#166534'
  },
  empty: {
    color: '#6b7280'
  }
});

export default ReservarScreen;
