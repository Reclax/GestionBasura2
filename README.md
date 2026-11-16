# Gestión de Basura 2 - EcoRuta Urbana

Segunda variante de una aplicación web para reportar residuos y organizar su
recolección. El repositorio contiene un frontend React/Vite y una API Express.

## Funcionamiento

La ciudadanía puede crear reportes sin registro. El personal operativo inicia
sesión y, según su rol, administra reportes y rutas o ejecuta las paradas
asignadas. El backend mantiene en memoria los reportes, conductores, rutas y
estados de atención, y el frontend consume sus endpoints bajo `/api`.

## Requisitos

- Node.js 18 o posterior.
- npm.

## Instalación y ejecución

En una terminal:

```bash
cd Backend
npm install
npm run dev
```

En otra terminal:

```bash
cd Frontend
npm install
npm run dev
```

Visita la URL indicada por Vite, normalmente `http://localhost:5173`. El
backend queda normalmente en `http://localhost:3000`.

## Estructura

- `Backend/src/routes/wasteRoutes.js`: rutas REST.
- `Backend/src/services/wasteService.js`: reglas de reportes y rutas.
- `Backend/src/data/store.js`: datos en memoria.
- `Frontend/src/features`: paneles de ciudadanía, administración y choferes.
- `Frontend/src/services/wasteApi.js`: integración con la API.

Para una instalación productiva se debe sustituir el almacenamiento en memoria
por una base de datos persistente y añadir autenticación robusta.
