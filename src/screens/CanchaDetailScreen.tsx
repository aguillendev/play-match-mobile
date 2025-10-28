import React, { useMemo } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { mockCanchas } from '@/mocks/canchas';
import { HomeStackParamList } from '@/navigation/AppNavigator';

const CanchaDetailScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { params } = useRoute<RouteProp<HomeStackParamList, 'CanchaDetail'>>();

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: cancha.ubicacion.latitude,
            longitude: cancha.ubicacion.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          <Marker coordinate={cancha.ubicacion} title={cancha.nombre} />
        </MapView>
      </View>
      <Text style={styles.title}>{cancha.nombre}</Text>
      <Text style={styles.subtitle}>Tipo: {cancha.tipo.replace('_', ' ')}</Text>
      <Text style={styles.price}>Precio: ${cancha.precioPorHora.toFixed(2)} / hora</Text>
      <Text style={styles.sectionTitle}>Servicios</Text>
      <View style={styles.servicesContainer}>
        {cancha.servicios?.map((service) => (
          <View key={service} style={styles.serviceTag}>
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Reservar', { canchaId: cancha.id })}
      >
        <Text style={styles.buttonText}>Reservar cancha</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12
  },
  mapContainer: {
    height: 220,
    borderRadius: 16,
    overflow: 'hidden'
  },
  title: {
    fontSize: 24,
    fontWeight: '700'
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563'
  },
  price: {
    fontSize: 16,
    fontWeight: '600'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  serviceTag: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999
  },
  serviceText: {
    fontSize: 12,
    color: '#374151'
  },
  button: {
    backgroundColor: '#16a34a',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CanchaDetailScreen;
