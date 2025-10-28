import React, { useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { PartidoCard } from '@/components/PartidoCard';
import { useLocationContext } from '@/context/LocationContext';
import { usePartidos } from '@/hooks/usePartidos';
import { PartidosStackParamList } from '@/navigation/AppNavigator';
import { Partido } from '@/types';

const PartidosScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<PartidosStackParamList>>();
  const { location } = useLocationContext();
  const { partidos, isLoading, error, cargarPartidos, unirseAPartido } = usePartidos();

  useEffect(() => {
    if (location) {
      void cargarPartidos({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    } else {
      void cargarPartidos();
    }
  }, [cargarPartidos, location]);

  if (isLoading && partidos.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error.message}
        onRetry={() =>
          location &&
          cargarPartidos({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          })
        }
      />
    );
  }

  const renderItem = ({ item }: { item: Partido }) => (
    <PartidoCard partido={item} onJoin={unirseAPartido} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Partidos abiertos</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('PublicarPartido')}
        >
          <Text style={styles.buttonText}>Publicar</Text>
        </Pressable>
      </View>
      <FlatList
        data={partidos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyState message="No hay partidos disponibles" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6'
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '700'
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32
  }
});

export default PartidosScreen;
