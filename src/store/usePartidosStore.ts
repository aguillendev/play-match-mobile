import { create } from 'zustand';
import { mockPartidos } from '@/mocks/canchas';
import { Partido } from '@/types';

interface PartidosState {
  partidos: Partido[];
  setPartidos: (partidos: Partido[]) => void;
  addPartido: (partido: Partido) => void;
  updatePartido: (partidoId: string, updater: (partido: Partido) => Partido) => void;
}

export const usePartidosStore = create<PartidosState>((set) => ({
  partidos: mockPartidos,
  setPartidos: (partidos) => set({ partidos }),
  addPartido: (partido) => set((state) => ({ partidos: [partido, ...state.partidos] })),
  updatePartido: (partidoId, updater) =>
    set((state) => ({
      partidos: state.partidos.map((partido) =>
        partido.id === partidoId ? updater(partido) : partido
      )
    }))
}));
