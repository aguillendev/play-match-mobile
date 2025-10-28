import { useCallback, useMemo, useState } from 'react';
import { apiClient } from '@/api/client';
import { mockCanchas } from '@/mocks/canchas';
import { ApiError, Cancha, LocationCoordinates } from '@/types';

interface UseCanchasParams {
  radioKm?: number;
  useMockData?: boolean;
}

export const useCanchas = (params: UseCanchasParams = {}) => {
  const { radioKm = 5, useMockData = true } = params;
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchCanchas = useCallback(
    async (coords?: LocationCoordinates) => {
      setIsLoading(true);
      try {
        if (useMockData || !coords) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setCanchas(mockCanchas);
          setError(null);
          return;
        }

        const response = await apiClient.get<Cancha[]>(
          '/api/canchas/disponibles',
          {
            params: {
              lat: coords.latitude,
              lng: coords.longitude,
              radioKm
            }
          }
        );
        setCanchas(response.data);
        setError(null);
      } catch (err: any) {
        setError({
          message: err?.response?.data?.message ?? 'Error al cargar canchas',
          status: err?.response?.status
        });
      } finally {
        setIsLoading(false);
      }
    },
    [radioKm, useMockData]
  );

  return useMemo(
    () => ({ canchas, isLoading, error, fetchCanchas }),
    [canchas, error, fetchCanchas, isLoading]
  );
};
