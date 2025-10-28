import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CanchaCard } from '@/components/CanchaCard';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { useLocationContext } from '@/context/LocationContext';
import { useCanchas } from '@/hooks/useCanchas';
import { HomeStackParamList } from '@/navigation/AppNavigator';
import { Cancha } from '@/types';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { location, isLoading: locationLoading, error: locationError, requestLocation } =
    useLocationContext();
  const [radioKm, setRadioKm] = useState(5);
  const { canchas, isLoading, error, fetchCanchas } = useCanchas({ radioKm });
  const radiusOptions = useMemo(() => [3, 5, 10, 15], []);

  useEffect(() => {
    if (location) {
      void fetchCanchas({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    } else {
      void fetchCanchas();
    }
  }, [fetchCanchas, location, radioKm]);

  useFocusEffect(
    React.useCallback(() => {
      if (!location) {
        void requestLocation();
      }
    }, [location, requestLocation])
  );

  const renderItem = ({ item }: { item: Cancha }) => (
    <CanchaCard
      cancha={item}
      onPress={() => navigation.navigate('CanchaDetail', { canchaId: item.id })}
    />
  );

  if (locationLoading || (isLoading && canchas.length === 0)) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} onRetry={() => requestLocation()} />;
  }

  return (
    <View style={styles.container}>
      {locationError && <Text style={styles.errorText}>{locationError}</Text>}
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          showsUserLocation
          initialRegion={{
            latitude: location?.coords.latitude ?? -34.6037,
            longitude: location?.coords.longitude ?? -58.3816,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
        >
          {canchas.map((cancha) => (
            <Marker
              key={cancha.id}
              coordinate={{
                latitude: cancha.ubicacion.latitude,
                longitude: cancha.ubicacion.longitude
              }}
              title={cancha.nombre}
              description={`$${cancha.precioPorHora}/h`}
              onCalloutPress={() =>
                navigation.navigate('CanchaDetail', { canchaId: cancha.id })
              }
            />
          ))}
        </MapView>
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.heading}>Canchas cercanas</Text>
        <View style={styles.radiusChips}>
          {radiusOptions.map((option) => (
            <Pressable
              key={option}
              style={[styles.chip, radioKm === option && styles.chipActive]}
              onPress={() => setRadioKm(option)}
            >
              <Text style={[styles.chipLabel, radioKm === option && styles.chipLabelActive]}>
                {option} km
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <FlatList
        data={canchas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyState message="No hay canchas disponibles" />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() =>
              location &&
              fetchCanchas({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })
            }
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6'
  },
  mapContainer: {
    height: 220,
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden'
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    fontSize: 20,
    fontWeight: '700'
  },
  radiusChips: {
    flexDirection: 'row',
    gap: 8
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#e5e7eb'
  },
  chipActive: {
    backgroundColor: '#16a34a'
  },
  chipLabel: {
    fontSize: 12,
    color: '#374151'
  },
  chipLabelActive: {
    color: '#fff'
  },
  errorText: {
    color: '#b91c1c',
    textAlign: 'center',
    marginTop: 8
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32
  }
});

export default HomeScreen;
