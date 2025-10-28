# Play Match Mobile

Aplicación móvil en React Native (Expo) orientada a jugadores de fútbol amateur para buscar canchas cercanas, realizar reservas y gestionar partidos abiertos.

## 🚀 Requisitos

- Node.js 18+
- pnpm / npm / yarn (cualquiera)
- Expo CLI (`npm install -g expo-cli`)

## 📦 Instalación

```bash
npm install
```

## ▶️ Ejecución

```bash
npm run start
```

El comando abrirá Expo Go. Desde allí podrás lanzar la app en un simulador iOS/Android o en un dispositivo real escaneando el QR.

## 🧭 Estructura principal

- `App.tsx`: punto de entrada con navegación y proveedores globales.
- `src/navigation/`: configuración de navegación con pestañas inferiores y stacks.
- `src/screens/`: pantallas principales (búsqueda, reservas, partidos y perfil).
- `src/hooks/`: hooks para interactuar con la API/mocks (`useCanchas`, `useReservas`, `usePartidos`).
- `src/mocks/`: datos locales para desarrollo sin backend.
- `src/context/LocationContext.tsx`: manejo de permisos y localización con `expo-location`.
- `src/store/`: Zustand store para la información del jugador y reservas.

## 🔌 Integración con API

Los hooks consumen mocks por defecto. Para conectarlos con el backend:

1. Configurá la URL base en `EXPO_PUBLIC_API_URL` (archivo `.env` o variables de entorno al iniciar Expo).
2. Pasá `useMockData: false` a los hooks cuando quieras utilizar la API real.

## 🗺️ Funcionalidades clave

- Búsqueda de canchas en un radio configurable usando el GPS del dispositivo.
- Visualización de canchas en mapa y lista con precios/distancias.
- Flujo de reserva seleccionando horarios disponibles.
- Gestión de partidos abiertos: listar, publicar y unirse.
- Perfil del jugador con reservas activas.

## 🧪 Linting

```bash
npm run lint
```

> _Nota:_ No se incluyeron pruebas automatizadas. Usa los mocks provistos para validar los flujos principales durante el desarrollo.
