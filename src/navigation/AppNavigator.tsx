import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '@/screens/HomeScreen';
import CanchaDetailScreen from '@/screens/CanchaDetailScreen';
import ReservarScreen from '@/screens/ReservarScreen';
import PartidosScreen from '@/screens/PartidosScreen';
import PublicarPartidoScreen from '@/screens/PublicarPartidoScreen';
import ProfileScreen from '@/screens/ProfileScreen';

export type HomeStackParamList = {
  Home: undefined;
  CanchaDetail: { canchaId: string };
  Reservar: { canchaId: string };
};

export type PartidosStackParamList = {
  Partidos: undefined;
  PublicarPartido: undefined;
};

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const PartidosStack = createNativeStackNavigator<PartidosStackParamList>();

const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Canchas' }}
    />
    <HomeStack.Screen
      name="CanchaDetail"
      component={CanchaDetailScreen}
      options={{ title: 'Detalle de cancha' }}
    />
    <HomeStack.Screen
      name="Reservar"
      component={ReservarScreen}
      options={{ title: 'Reservar' }}
    />
  </HomeStack.Navigator>
);

const PartidosStackNavigator = () => (
  <PartidosStack.Navigator>
    <PartidosStack.Screen
      name="Partidos"
      component={PartidosScreen}
      options={{ title: 'Partidos abiertos' }}
    />
    <PartidosStack.Screen
      name="PublicarPartido"
      component={PublicarPartidoScreen}
      options={{ title: 'Publicar partido' }}
    />
  </PartidosStack.Navigator>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'football-outline';
          if (route.name === 'Inicio') {
            iconName = 'home-outline';
          } else if (route.name === 'Partidos') {
            iconName = 'people-outline';
          } else if (route.name === 'Perfil') {
            iconName = 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStackNavigator} />
      <Tab.Screen name="Partidos" component={PartidosStackNavigator} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
