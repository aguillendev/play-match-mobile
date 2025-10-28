import { Cancha, HorarioDisponible, Partido, Reserva } from '@/types';

export const mockCanchas: Cancha[] = [
  {
    id: 'c1',
    nombre: 'Complejo La Bombonera',
    tipo: 'futbol_5',
    precioPorHora: 35,
    distanciaKm: 1.2,
    ubicacion: {
      latitude: -34.6037,
      longitude: -58.3816
    },
    servicios: ['Estacionamiento', 'Vestuarios']
  },
  {
    id: 'c2',
    nombre: 'Club Atlético River',
    tipo: 'futbol_7',
    precioPorHora: 42,
    distanciaKm: 2.6,
    ubicacion: {
      latitude: -34.5453,
      longitude: -58.4497
    },
    servicios: ['Duchas', 'Bar']
  }
];

export const mockHorarios: Record<string, HorarioDisponible[]> = {
  c1: [
    {
      id: 'h1',
      fecha: new Date().toISOString(),
      horaInicio: '18:00',
      horaFin: '19:00',
      disponible: true
    },
    {
      id: 'h2',
      fecha: new Date().toISOString(),
      horaInicio: '19:00',
      horaFin: '20:00',
      disponible: false
    }
  ],
  c2: [
    {
      id: 'h3',
      fecha: new Date().toISOString(),
      horaInicio: '17:00',
      horaFin: '18:00',
      disponible: true
    }
  ]
};

export const mockReservas: Reserva[] = [
  {
    id: 'r1',
    canchaId: 'c1',
    fecha: new Date().toISOString(),
    horaInicio: '18:00',
    horaFin: '19:00',
    estado: 'confirmada'
  }
];

export const mockPartidos: Partido[] = [
  {
    id: 'p1',
    canchaId: 'c2',
    horarioId: 'h3',
    fecha: new Date().toISOString(),
    horaInicio: '17:00',
    horaFin: '18:00',
    cupoMaximo: 10,
    jugadoresConfirmados: 6,
    creador: 'Juan Pérez',
    notas: 'Traer camiseta roja',
    ubicacion: {
      latitude: -34.5453,
      longitude: -58.4497
    }
  }
];
