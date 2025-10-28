import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

interface LocationContextValue {
  location: LocationObject | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export const LocationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permiso de ubicación denegado');
        setIsLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync();
      setLocation(currentLocation);
      setError(null);
    } catch (err) {
      setError('No se pudo obtener la ubicación');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void requestLocation();
  }, [requestLocation]);

  return (
    <LocationContext.Provider value={{ location, isLoading, error, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext debe usarse dentro de un LocationProvider');
  }
  return context;
};
