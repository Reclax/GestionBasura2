import { useState } from "react";

export function LoginPanel({ onLogin, onCancel }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await onLogin(form);
    } catch (loginError) {
      setError(loginError.message || "No se pudo iniciar sesion");
    }
  }

  return (
    <section className="mx-auto flex h-full w-full max-w-6xl items-center justify-center p-4">
      <article className="grid w-full max-w-5xl gap-0 overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_25px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl md:grid-cols-[1.35fr_1fr]">
        <div className="flex min-h-[460px] flex-col justify-center bg-[linear-gradient(125deg,#0f172a_0%,#134e4a_42%,#14532d_100%)] p-8 text-white md:p-12">
          <p className="inline-flex w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-[0.14em]">
            PLATAFORMA OPERATIVA MUNICIPAL
          </p>
          <h1 className="mt-6 max-w-lg text-4xl font-extrabold leading-tight md:text-5xl md:leading-tight">
            Bienvenido a
            <span className="block text-emerald-200">EcoRuta Urbana</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-emerald-50/95 md:text-lg">
            Un centro digital para coordinar la recoleccion de residuos,
            responder reportes ciudadanos y mantener la ciudad limpia con una
            operacion eficiente y cercana a la comunidad.
          </p>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Ingreso operativo
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Admin: admin/admin123 | Choferes: luis/luis123, andrea/andrea123,
            jhon/jhon123
          </p>

          <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
            <label className="field">
              Usuario
              <input
                value={form.username}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, username: event.target.value }))
                }
                placeholder="Escribe tu usuario"
                required
              />
            </label>

            <label className="field">
              Clave
              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder="Escribe tu clave"
                required
              />
            </label>

            {error && (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                {error}
              </p>
            )}

            <button className="btn-primary mt-2" type="submit">
              Entrar al sistema
            </button>

            {onCancel && (
              <button className="btn-ghost" type="button" onClick={onCancel}>
                Volver al reporte ciudadano
              </button>
            )}
          </form>
        </div>
      </article>
    </section>
  );
}
