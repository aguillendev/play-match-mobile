import { create } from 'zustand';
import { PlayerProfile, Reserva } from '@/types';
import { mockReservas } from '@/mocks/canchas';

interface PlayerState {
  profile: PlayerProfile;
  addReserva: (reserva: Reserva) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  profile: {
    id: 'player-1',
    nombre: 'Lionel Messi',
    nivel: 'avanzado',
    posicionFavorita: 'Delantero',
    reservas: mockReservas
  },
  addReserva: (reserva) =>
    set((state) => ({
      profile: {
        ...state.profile,
        reservas: [...state.profile.reservas, reserva]
      }
    }))
}));
