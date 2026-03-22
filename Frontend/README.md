# Frontend - EcoRuta Urbana

Interfaz web de operacion para ciudadania, administracion y choferes dentro del sistema de recoleccion de basura.

## Objetivo operativo

Este frontend esta disenado para ayudar a que los reportes de basura se atiendan en menos de una hora, conectando en una sola interfaz:

- reporte ciudadano sin registro,
- inicio de sesion operativo para administracion y choferes,
- asignacion de reportes a rutas,
- seguimiento visual del avance de recoleccion.

## Que hace este modulo

- permite crear reportes ciudadanos de forma rapida,
- muestra metricas y estado de la operacion en tiempo real,
- habilita gestion administrativa de reportes y rutas,
- presenta panel de chofer con progreso por parada y cierre de jornada,
- consume la API del backend via `/api`.

## Estructura

- `src/app/App.jsx`: shell principal y flujo de sesion.
- `src/features/population/`: experiencia ciudadana.
- `src/features/admin/`: panel de administracion.
- `src/features/drivers/`: panel de choferes.
- `src/features/common/`: componentes compartidos (header/login).
- `src/hooks/useWasteSystem.js`: estado y operaciones de negocio en frontend.
- `src/services/wasteApi.js`: cliente HTTP hacia backend.
- `src/styles/app.css`: estilos globales de interfaz.

## Flujo de usuarios

1. Ciudadania:

- puede reportar basura sin iniciar sesion.

2. Personal operativo:

- inicia sesion con credenciales.
- segun el usuario autenticado se muestra automaticamente la vista de Administracion o Chofer.

## Ejecutar en local

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar entorno de desarrollo:

```bash
npm run dev
```

3. Generar build de produccion:

```bash
npm run build
```

## Integracion con backend

- Vite tiene proxy configurado para enviar `/api` a `http://localhost:3000`.
- Asegura que el backend este corriendo antes de probar flujos completos.

## Impacto esperado

La combinacion de reporte inmediato, priorizacion administrativa y ejecucion guiada de rutas permite reducir significativamente los tiempos de respuesta, con objetivo operativo de atencion en menos de 1 hora por reporte critico.
