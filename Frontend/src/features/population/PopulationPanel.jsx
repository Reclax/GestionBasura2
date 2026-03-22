import { useState } from "react";
import { statusBadge } from "../../utils/statusBadge";

const INITIAL_FORM = {
  zone: "",
  address: "",
  reference: "",
  wasteType: "Mixto",
  notes: "",
};

export function PopulationPanel({ reports, onCreateReport }) {
  const [reportForm, setReportForm] = useState(INITIAL_FORM);

  async function handleSubmit(event) {
    event.preventDefault();
    await onCreateReport(reportForm);
    setReportForm(INITIAL_FORM);
  }

  return (
    <section className="grid h-full animate-rise gap-3 lg:grid-cols-[1.2fr_1fr]">
      <article className="glass rounded-3xl p-4 md:p-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Nuevo reporte ciudadano
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Registra focos de basura no atendidos para activar respuesta
          operativa.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-5 grid gap-4 sm:grid-cols-2"
        >
          <label className="field sm:col-span-2">
            Zona
            <input
              value={reportForm.zone}
              onChange={(event) =>
                setReportForm((prev) => ({ ...prev, zone: event.target.value }))
              }
              placeholder="Ej: Barrio Norte"
              required
            />
          </label>
          <label className="field sm:col-span-2">
            Direccion exacta
            <input
              value={reportForm.address}
              onChange={(event) =>
                setReportForm((prev) => ({
                  ...prev,
                  address: event.target.value,
                }))
              }
              placeholder="Ej: Calle 12 #45-90"
              required
            />
          </label>
          <label className="field sm:col-span-2">
            Punto de referencia
            <input
              value={reportForm.reference}
              onChange={(event) =>
                setReportForm((prev) => ({
                  ...prev,
                  reference: event.target.value,
                }))
              }
              placeholder="Ej: Frente al colegio"
              required
            />
          </label>
          <label className="field sm:col-span-1">
            Tipo de residuo
            <select
              value={reportForm.wasteType}
              onChange={(event) =>
                setReportForm((prev) => ({
                  ...prev,
                  wasteType: event.target.value,
                }))
              }
            >
              <option>Mixto</option>
              <option>Organico</option>
              <option>Reciclable</option>
              <option>Voluminoso</option>
              <option>Peligroso</option>
            </select>
          </label>
          <label className="field sm:col-span-1">
            Observaciones
            <input
              value={reportForm.notes}
              onChange={(event) =>
                setReportForm((prev) => ({
                  ...prev,
                  notes: event.target.value,
                }))
              }
              placeholder="Detalles para el equipo"
            />
          </label>
          <button className="btn-primary sm:col-span-2" type="submit">
            Enviar reporte
          </button>
        </form>
      </article>

      <article className="glass rounded-3xl p-4 md:p-5">
        <h3 className="text-xl font-bold text-slate-900">
          Seguimiento de reportes
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Estado en tiempo real del historial ciudadano.
        </p>

        <div className="mt-4 space-y-3">
          {reports.slice(0, 6).map((report) => (
            <div
              key={report.id}
              className="rounded-2xl bg-white/75 p-4 ring-1 ring-slate-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    REP-{String(report.id).padStart(4, "0")}
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {report.address}
                  </p>
                  <p className="text-xs text-slate-500">{report.zone}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusBadge(report.status)}`}
                >
                  {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
