# Backend - EcoRuta Urbana

API REST para gestionar reportes ciudadanos de basura, planificar rutas y dar seguimiento operativo a choferes.

## Objetivo operativo

Este backend esta orientado a que los reportes de basura sean atendidos en menos de una hora mediante:

- registro rapido de reportes ciudadanos,
- priorizacion y programacion inmediata por administracion,
- asignacion directa a rutas de choferes en el mismo flujo,
- seguimiento del estado en tiempo real (`Pendiente`, `En revision`, `Programado`, `En ruta`, `Recolectado`).

## Que hace este modulo

- expone endpoints para reportes, rutas, dashboard y choferes,
- centraliza reglas de negocio para estados y asignaciones,
- devuelve errores controlados con formato JSON,
- sirve como base para decisiones operativas en menos de 1 hora.

## Estructura

- `src/app.js`: configuracion de Express, rutas y middleware de errores.
- `src/server.js`: arranque del servidor.
- `src/routes/wasteRoutes.js`: definicion de endpoints `/api`.
- `src/controllers/wasteController.js`: capa HTTP (request/response).
- `src/services/wasteService.js`: logica de negocio (reportes, rutas, estados).
- `src/data/store.js`: almacenamiento en memoria con datos iniciales.
- `src/config/constants.js`: constantes globales (puerto y estados).

## Endpoints principales

- `GET /api/health`: estado de la API.
- `GET /api/dashboard`: resumen general (drivers, reports, routes, metrics).
- `GET /api/reports`: listado de reportes.
- `POST /api/reports`: crear reporte ciudadano.
- `PATCH /api/reports/:reportId/status`: actualizar estado de reporte.
- `GET /api/routes`: listado de rutas.
- `POST /api/routes`: crear ruta.
- `POST /api/routes/:routeId/assign-report`: asignar reporte a ruta.
- `POST /api/routes/:routeId/start`: iniciar ruta.
- `POST /api/routes/:routeId/toggle-stop`: marcar/desmarcar parada atendida.
- `POST /api/routes/:routeId/finish`: finalizar ruta.
- `GET /api/drivers`: listado de choferes.
- `GET /api/drivers/:driverId/routes`: rutas por chofer.

## Ejecutar en local

1. Instalar dependencias:

```bash
npm install
```

2. Levantar API (produccion local):

```bash
npm start
```

3. Levantar API en modo desarrollo:

```bash
npm run dev
```

Servidor por defecto: `http://localhost:3000`

## Nota tecnica

Actualmente usa almacenamiento en memoria (`store.js`). Para produccion real se recomienda migrar a base de datos persistente y autenticacion segura.
