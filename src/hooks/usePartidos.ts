import { useCallback, useMemo, useState } from 'react';
import { apiClient } from '@/api/client';
import { mockPartidos } from '@/mocks/canchas';
import { ApiError, LocationCoordinates, Partido } from '@/types';
import { usePartidosStore } from '@/store/usePartidosStore';

interface UsePartidosOptions {
  useMockData?: boolean;
}

export const usePartidos = ({ useMockData = true }: UsePartidosOptions = {}) => {
  const partidos = usePartidosStore((state) => state.partidos);
  const setPartidosStore = usePartidosStore((state) => state.setPartidos);
  const addPartido = usePartidosStore((state) => state.addPartido);
  const updatePartido = usePartidosStore((state) => state.updatePartido);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const cargarPartidos = useCallback(
    async (coords?: LocationCoordinates) => {
      setIsLoading(true);
      try {
        if (useMockData || !coords) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setPartidosStore(mockPartidos);
          setError(null);
          return;
        }

        const response = await apiClient.get<Partido[]>('/api/partidos/abiertos', {
          params: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });
        setPartidosStore(response.data);
        setError(null);
      } catch (err: any) {
        setError({
          message: err?.response?.data?.message ?? 'Error al cargar partidos',
          status: err?.response?.status
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setPartidosStore, useMockData]
  );

  const publicarPartido = useCallback(
    async (payload: Partial<Partido>) => {
      setIsLoading(true);
      try {
        if (useMockData) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const nuevoPartido: Partido = {
            id: `mock-${Date.now()}`,
            canchaId: payload.canchaId ?? 'c1',
            horarioId: payload.horarioId ?? 'h1',
            fecha: payload.fecha ?? new Date().toISOString(),
            horaInicio: payload.horaInicio ?? '20:00',
            horaFin: payload.horaFin ?? '21:00',
            cupoMaximo: payload.cupoMaximo ?? 10,
            jugadoresConfirmados: 1,
            creador: payload.creador ?? 'Jugador Anónimo',
            notas: payload.notas,
            ubicacion: payload.ubicacion ?? { latitude: -34.6, longitude: -58.38 }
          };
          addPartido(nuevoPartido);
          setError(null);
          return nuevoPartido;
        }

        const response = await apiClient.post<Partido>('/api/partidos/publicar', payload);
        addPartido(response.data);
        setError(null);
        return response.data;
      } catch (err: any) {
        const apiError: ApiError = {
          message: err?.response?.data?.message ?? 'Error al publicar el partido',
          status: err?.response?.status
        };
        setError(apiError);
        throw apiError;
      } finally {
        setIsLoading(false);
      }
    },
    [addPartido, useMockData]
  );

  const unirseAPartido = useCallback(
    async (partidoId: string) => {
      setIsLoading(true);
      try {
        if (useMockData) {
          await new Promise((resolve) => setTimeout(resolve, 300));
          updatePartido(partidoId, (partido) => ({
            ...partido,
            jugadoresConfirmados: Math.min(
              partido.cupoMaximo,
              partido.jugadoresConfirmados + 1
            )
          }));
          setError(null);
          return;
        }

        await apiClient.post(`/api/partidos/${partidoId}/unirse`);
        updatePartido(partidoId, (partido) => ({
          ...partido,
          jugadoresConfirmados: Math.min(
            partido.cupoMaximo,
            partido.jugadoresConfirmados + 1
          )
        }));
        setError(null);
      } catch (err: any) {
        setError({
          message: err?.response?.data?.message ?? 'No se pudo unir al partido',
          status: err?.response?.status
        });
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [updatePartido, useMockData]
  );

  return useMemo(
    () => ({ partidos, isLoading, error, cargarPartidos, publicarPartido, unirseAPartido }),
    [partidos, isLoading, error, cargarPartidos, publicarPartido, unirseAPartido]
  );
};
