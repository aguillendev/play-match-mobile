import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Reserva } from '@/types';

const ProfileScreen: React.FC = () => {
  const { profile } = usePlayerStore();

  const renderItem = ({ item }: { item: Reserva }) => (
    <View style={styles.reservaCard}>
      <Text style={styles.reservaTitle}>Cancha {item.canchaId.toUpperCase()}</Text>
      <Text style={styles.reservaInfo}>{new Date(item.fecha).toLocaleDateString()}</Text>
      <Text style={styles.reservaInfo}>
        {item.horaInicio} - {item.horaFin}
      </Text>
      <Text style={styles.reservaEstado}>Estado: {item.estado}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.name}>{profile.nombre}</Text>
        {profile.posicionFavorita && (
          <Text style={styles.subtitle}>Posición: {profile.posicionFavorita}</Text>
        )}
        {profile.nivel && <Text style={styles.subtitle}>Nivel: {profile.nivel}</Text>}
      </View>
      <Text style={styles.sectionTitle}>Mis reservas</Text>
      <FlatList
        data={profile.reservas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>Aún no tenés reservas.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  profileHeader: {
    padding: 16,
    backgroundColor: '#16a34a'
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff'
  },
  subtitle: {
    fontSize: 14,
    color: '#dcfce7'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12
  },
  reservaCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  reservaTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  reservaInfo: {
    fontSize: 14,
    color: '#4b5563'
  },
  reservaEstado: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '500'
  },
  empty: {
    textAlign: 'center',
    color: '#6b7280'
  }
});

export default ProfileScreen;
