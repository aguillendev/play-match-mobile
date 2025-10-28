export type SportType = 'futbol_5' | 'futbol_7' | 'futbol_11';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface Cancha {
  id: string;
  nombre: string;
  tipo: SportType;
  precioPorHora: number;
  distanciaKm: number;
  ubicacion: LocationCoordinates;
  servicios?: string[];
}

export interface HorarioDisponible {
  id: string;
  fecha: string; // ISO date string
  horaInicio: string; // HH:mm
  horaFin: string; // HH:mm
  disponible: boolean;
}

export interface Reserva {
  id: string;
  canchaId: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: 'confirmada' | 'pendiente' | 'cancelada';
}

export interface Partido {
  id: string;
  canchaId: string;
  horarioId: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  cupoMaximo: number;
  jugadoresConfirmados: number;
  creador: string;
  notas?: string;
  ubicacion: LocationCoordinates;
}

export interface PlayerProfile {
  id: string;
  nombre: string;
  posicionFavorita?: string;
  nivel?: 'principiante' | 'intermedio' | 'avanzado';
  reservas: Reserva[];
}

export interface ApiError {
  message: string;
  status?: number;
}
