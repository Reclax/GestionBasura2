import { useMemo, useState } from "react";
import { statusBadge } from "../../utils/statusBadge";

export function AdminPanel({ reports, routes, drivers, actions }) {
  const [adminAssignment, setAdminAssignment] = useState({
    reportId: "",
    routeId: "",
  });
  const [routeForm, setRouteForm] = useState({
    name: "",
    date: new Date().toISOString().slice(0, 10),
    shift: "Manana",
    truck: "CAM-104",
    driverId: drivers[0]?.id || "drv-1",
    neighborhoods: "",
  });

  const availableReports = useMemo(
    () =>
      reports.filter(
        (report) => !report.assignedRouteId && report.status !== "Recolectado",
      ),
    [reports],
  );

  async function handleAssign(event) {
    event.preventDefault();
    if (!adminAssignment.reportId || !adminAssignment.routeId) {
      return;
    }

    await actions.assignReportToRoute(
      adminAssignment.routeId,
      adminAssignment.reportId,
    );
    setAdminAssignment({ reportId: "", routeId: "" });
  }

  async function handleCreateRoute(event) {
    event.preventDefault();
    await actions.createRoute(routeForm);
    setRouteForm((prev) => ({ ...prev, name: "", neighborhoods: "" }));
  }

  return (
    <section className="grid h-full min-h-0 animate-rise gap-3 xl:grid-cols-[1.3fr_1fr]">
      <article className="glass flex min-h-0 flex-col rounded-3xl p-4 md:p-5">
        <h2 className="text-2xl font-bold text-slate-900">Centro de control</h2>
        <p className="mt-1 text-sm text-slate-600">
          Prioriza incidencias y actualiza estados operativos.
        </p>

        <div className="mt-3 min-h-0 flex-1 overflow-auto rounded-2xl bg-white/80 ring-1 ring-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 z-10 bg-slate-50 text-xs uppercase tracking-[0.1em] text-slate-500">
              <tr>
                <th className="px-3 py-3">ID</th>
                <th className="px-3 py-3">Zona</th>
                <th className="px-3 py-3">Direccion</th>
                <th className="px-3 py-3">Urgencia</th>
                <th className="px-3 py-3">Estado</th>
                <th className="px-3 py-3">Accion</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-t border-slate-100">
                  <td className="px-3 py-3 font-semibold text-slate-700">
                    REP-{String(report.id).padStart(4, "0")}
                  </td>
                  <td className="px-3 py-3 text-slate-600">{report.zone}</td>
                  <td className="px-3 py-3 text-slate-600">{report.address}</td>
                  <td className="px-3 py-3 text-slate-600">
                    {report.severity}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusBadge(report.status)}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={report.status}
                      onChange={(event) =>
                        actions.updateReportStatus(
                          report.id,
                          event.target.value,
                        )
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
                    >
                      <option>Pendiente</option>
                      <option>En revision</option>
                      <option>Programado</option>
                      <option>En ruta</option>
                      <option>Recolectado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="flex min-h-0 flex-col gap-3 overflow-auto pr-1">
        <div className="glass rounded-3xl p-4 md:p-5">
          <h3 className="text-lg font-bold text-slate-900">
            Asignar reporte a ruta
          </h3>
          <form onSubmit={handleAssign} className="mt-3 grid gap-2.5">
            <label className="field">
              Reporte pendiente
              <select
                value={adminAssignment.reportId}
                onChange={(event) =>
                  setAdminAssignment((prev) => ({
                    ...prev,
                    reportId: event.target.value,
                  }))
                }
              >
                <option value="">Selecciona un reporte</option>
                {availableReports.map((report) => (
                  <option key={report.id} value={report.id}>
                    REP-{String(report.id).padStart(4, "0")} - {report.zone}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              Ruta destino
              <select
                value={adminAssignment.routeId}
                onChange={(event) =>
                  setAdminAssignment((prev) => ({
                    ...prev,
                    routeId: event.target.value,
                  }))
                }
              >
                <option value="">Selecciona una ruta</option>
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name} - {route.date}
                  </option>
                ))}
              </select>
            </label>
            <button className="btn-primary" type="submit">
              Programar reporte
            </button>
          </form>
        </div>

        <div className="glass rounded-3xl p-4 md:p-5">
          <h3 className="text-lg font-bold text-slate-900">Crear nueva ruta</h3>
          <form onSubmit={handleCreateRoute} className="mt-3 grid gap-2.5">
            <label className="field">
              Nombre de ruta
              <input
                value={routeForm.name}
                onChange={(event) =>
                  setRouteForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                placeholder="Ej: Ruta Norte AM"
                required
              />
            </label>
            <label className="field">
              Fecha
              <input
                type="date"
                value={routeForm.date}
                onChange={(event) =>
                  setRouteForm((prev) => ({
                    ...prev,
                    date: event.target.value,
                  }))
                }
                required
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="field">
                Turno
                <select
                  value={routeForm.shift}
                  onChange={(event) =>
                    setRouteForm((prev) => ({
                      ...prev,
                      shift: event.target.value,
                    }))
                  }
                >
                  <option>Manana</option>
                  <option>Tarde</option>
                  <option>Noche</option>
                </select>
              </label>
              <label className="field">
                Camion
                <input
                  value={routeForm.truck}
                  onChange={(event) =>
                    setRouteForm((prev) => ({
                      ...prev,
                      truck: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <label className="field">
              Chofer asignado
              <select
                value={routeForm.driverId}
                onChange={(event) =>
                  setRouteForm((prev) => ({
                    ...prev,
                    driverId: event.target.value,
                  }))
                }
              >
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              Cobertura de barrios
              <input
                value={routeForm.neighborhoods}
                onChange={(event) =>
                  setRouteForm((prev) => ({
                    ...prev,
                    neighborhoods: event.target.value,
                  }))
                }
                placeholder="Ej: Centro - Norte - Lago"
                required
              />
            </label>
            <button className="btn-primary" type="submit">
              Crear ruta
            </button>
          </form>
        </div>
      </article>
    </section>
  );
}
