import { useCallback, useMemo, useState } from 'react';
import { apiClient } from '@/api/client';
import { mockHorarios, mockReservas } from '@/mocks/canchas';
import { ApiError, HorarioDisponible, Reserva } from '@/types';

interface UseReservasOptions {
  useMockData?: boolean;
}

export const useReservas = ({ useMockData = true }: UseReservasOptions = {}) => {
  const [reservas, setReservas] = useState<Reserva[]>(mockReservas);
  const [horariosDisponibles, setHorariosDisponibles] = useState<Record<string, HorarioDisponible[]>>(mockHorarios);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const reservarCancha = useCallback(
    async (canchaId: string, horario: HorarioDisponible) => {
      setIsLoading(true);
      try {
        if (useMockData) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const nuevaReserva: Reserva = {
            id: `mock-${Date.now()}`,
            canchaId,
            fecha: horario.fecha,
            horaInicio: horario.horaInicio,
            horaFin: horario.horaFin,
            estado: 'confirmada'
          };
          setReservas((prev) => [...prev, nuevaReserva]);
          setHorariosDisponibles((prev) => ({
            ...prev,
            [canchaId]: prev[canchaId]?.map((h) =>
              h.id === horario.id ? { ...h, disponible: false } : h
            ) ?? []
          }));
          setError(null);
          return nuevaReserva;
        }

        const response = await apiClient.post<Reserva>('/api/reservas', {
          canchaId,
          horarioId: horario.id
        });
        setReservas((prev) => [...prev, response.data]);
        setError(null);
        return response.data;
      } catch (err: any) {
        const apiError: ApiError = {
          message: err?.response?.data?.message ?? 'Error al reservar la cancha',
          status: err?.response?.status
        };
        setError(apiError);
        throw apiError;
      } finally {
        setIsLoading(false);
      }
    },
    [useMockData]
  );

  return useMemo(
    () => ({ reservas, horariosDisponibles, reservarCancha, isLoading, error }),
    [reservas, horariosDisponibles, reservarCancha, isLoading, error]
  );
};
