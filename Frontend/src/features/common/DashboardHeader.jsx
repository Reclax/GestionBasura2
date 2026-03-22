export function DashboardHeader({ metrics }) {
  return (
    <header className="glass animate-rise rounded-3xl p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 inline-flex rounded-full bg-white/65 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-emerald-700 ring-1 ring-white/70">
            CENTRO DE ASEO Y RECOLECCION
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Operacion integral de residuos solidos urbanos
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
            Gestiona reportes ciudadanos, planifica rutas operativas y ejecuta
            recoleccion con trazabilidad para mejorar la salud publica.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
          <div className="metric-card">
            <span>Pendientes</span>
            <strong>{metrics.pending}</strong>
          </div>
          <div className="metric-card">
            <span>En ruta</span>
            <strong>{metrics.inRoute}</strong>
          </div>
          <div className="metric-card">
            <span>Resueltos</span>
            <strong>{metrics.solved}</strong>
          </div>
          <div className="metric-card">
            <span>Rutas activas</span>
            <strong>{metrics.activeRoutes}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}
