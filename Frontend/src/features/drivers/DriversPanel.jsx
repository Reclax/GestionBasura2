import { statusBadge } from "../../utils/statusBadge";

function routeCompletion(route) {
  if (!route.stops.length) {
    return 0;
  }

  return Math.round((route.completedStopIds.length / route.stops.length) * 100);
}

export function DriversPanel({
  reports,
  routes,
  drivers,
  driverView,
  onChangeDriver,
  actions,
  lockedDriver = false,
}) {
  const selectedDriver = drivers.find((driver) => driver.id === driverView);
  const driverRoutes = routes.filter((route) => route.driverId === driverView);

  function reportById(reportId) {
    return reports.find((report) => report.id === reportId);
  }

  return (
    <section className="animate-rise space-y-6">
      <article className="glass rounded-3xl p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Panel de chofer
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Consulta camiones, rutas del dia y avance por punto de
              recoleccion.
            </p>
          </div>
          {!lockedDriver && (
            <label className="field max-w-sm">
              Seleccionar chofer
              <select
                value={driverView}
                onChange={(event) => onChangeDriver(event.target.value)}
              >
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        <div className="mt-4 rounded-2xl bg-white/75 p-4 ring-1 ring-slate-200">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
            Chofer activo
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">
            {selectedDriver?.name}
          </h3>
          <p className="text-sm text-slate-600">
            Licencia {selectedDriver?.license} | Contacto{" "}
            {selectedDriver?.phone}
          </p>
        </div>
      </article>

      <div className="grid gap-4 xl:grid-cols-2">
        {driverRoutes.length === 0 && (
          <div className="glass rounded-3xl p-6 text-sm text-slate-600">
            No hay rutas asignadas para este chofer.
          </div>
        )}

        {driverRoutes.slice(0, 2).map((route) => (
          <article key={route.id} className="glass rounded-3xl p-5 md:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  {route.date} | {route.shift}
                </p>
                <h3 className="text-xl font-bold text-slate-900">
                  {route.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {route.neighborhoods}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusBadge(route.status)}`}
              >
                {route.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-white/70 px-3 py-2 ring-1 ring-slate-200">
                Camion: <strong>{route.truck}</strong>
              </div>
              <div className="rounded-xl bg-white/70 px-3 py-2 ring-1 ring-slate-200">
                Paradas: <strong>{route.stops.length}</strong>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>Avance</span>
                <span>{routeCompletion(route)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all"
                  style={{ width: `${routeCompletion(route)}%` }}
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {route.stops.map((stop) => {
                const report = reportById(stop.reportId);
                if (!report) {
                  return null;
                }

                const checked = route.completedStopIds.includes(stop.reportId);

                return (
                  <label
                    key={stop.reportId}
                    className="flex items-start gap-3 rounded-2xl bg-white/75 p-3 ring-1 ring-slate-200"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        actions.toggleStop(route.id, stop.reportId)
                      }
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-500"
                    />
                    <span className="text-sm">
                      <strong className="block text-slate-800">
                        {report.address}
                      </strong>
                      <span className="text-slate-600">
                        {report.zone} | {report.wasteType} | {report.severity}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => actions.startRoute(route.id)}
              >
                Iniciar ruta
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => actions.finishRoute(route.id)}
              >
                Finalizar jornada
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
