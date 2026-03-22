import { useMemo, useState } from "react";
import { AdminPanel } from "../features/admin/AdminPanel";
import { DashboardHeader } from "../features/common/DashboardHeader";
import { LoginPanel } from "../features/common/LoginPanel";
import { DriversPanel } from "../features/drivers/DriversPanel";
import { PopulationPanel } from "../features/population/PopulationPanel";
import { useWasteSystem } from "../hooks/useWasteSystem";
import "../styles/app.css";

const USER_ACCOUNTS = [
  {
    username: "admin",
    password: "admin123",
    role: "administracion",
    displayName: "Centro de Control",
  },
  {
    username: "luis",
    password: "luis123",
    role: "choferes",
    displayName: "Operador de Ruta",
    driverId: "drv-1",
  },
  {
    username: "andrea",
    password: "andrea123",
    role: "choferes",
    displayName: "Operador de Ruta",
    driverId: "drv-2",
  },
  {
    username: "jhon",
    password: "jhon123",
    role: "choferes",
    displayName: "Operador de Ruta",
    driverId: "drv-3",
  },
];

function EmptyState({ message }) {
  return (
    <section className="glass animate-rise rounded-3xl p-4 text-sm text-rose-700">
      {message}
    </section>
  );
}

function LoadingState() {
  return (
    <section className="glass animate-rise rounded-3xl p-4 text-sm text-slate-600">
      Cargando informacion operativa...
    </section>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [session, setSession] = useState(null);
  const [driverView, setDriverView] = useState("drv-1");
  const { drivers, reports, routes, metrics, loading, error, actions } =
    useWasteSystem();

  async function handleLogin({ username, password }) {
    const account = USER_ACCOUNTS.find(
      (item) => item.username === username && item.password === password,
    );

    if (!account) {
      throw new Error("Usuario o clave incorrectos");
    }

    setSession({
      role: account.role,
      displayName: account.displayName,
      driverId: account.driverId || "",
    });

    setShowLogin(false);

    if (account.role === "choferes" && account.driverId) {
      setDriverView(account.driverId);
    }
  }

  function handleLogout() {
    setSession(null);
  }

  const activeRole = session?.role || "poblacion";

  const safeDriver = useMemo(() => {
    if (!drivers.length) {
      return "drv-1";
    }

    const exists = drivers.some((driver) => driver.id === driverView);
    return exists ? driverView : drivers[0].id;
  }, [drivers, driverView]);

  const sessionLabel = useMemo(() => {
    if (!session) {
      return "";
    }

    if (session.role !== "choferes") {
      return session.displayName;
    }

    const driver = drivers.find((item) => item.id === session.driverId);
    return driver
      ? `${session.displayName}: ${driver.name}`
      : session.displayName;
  }, [drivers, session]);

  return (
    <div className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_0%_0%,#15803d55,transparent_36%),radial-gradient(circle_at_100%_0%,#f9731644,transparent_33%),linear-gradient(130deg,#f7fee7_0%,#ecfccb_28%,#ecfeff_64%,#f8fafc_100%)] p-3 text-slate-800 md:p-5">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <main className="mx-auto flex h-full w-full max-w-[1600px] flex-col gap-3">
        <section className="animate-rise flex items-center justify-start">
          {session ? (
            <div className="flex items-center gap-3 rounded-xl bg-white/80 px-3 py-2 text-sm ring-1 ring-slate-200">
              <p className="font-semibold text-slate-700">{sessionLabel}</p>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleLogout}
              >
                Cerrar sesion
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setShowLogin(true)}
            >
              Iniciar sesion
            </button>
          )}
        </section>

        <DashboardHeader metrics={metrics} />

        <section className="min-h-0 flex-1 overflow-hidden">
          {loading && <LoadingState />}
          {!loading && error && <EmptyState message={error} />}

          {!loading && !error && activeRole === "poblacion" && (
            <PopulationPanel
              reports={reports}
              onCreateReport={actions.createReport}
            />
          )}

          {!loading && !error && activeRole === "administracion" && (
            <AdminPanel
              reports={reports}
              routes={routes}
              drivers={drivers}
              actions={actions}
            />
          )}

          {!loading && !error && activeRole === "choferes" && (
            <DriversPanel
              reports={reports}
              routes={routes}
              drivers={drivers}
              driverView={safeDriver}
              onChangeDriver={setDriverView}
              actions={actions}
              lockedDriver={Boolean(session?.driverId)}
            />
          )}
        </section>
      </main>

      {showLogin && (
        <div className="login-overlay">
          <LoginPanel
            onLogin={handleLogin}
            onCancel={() => {
              setShowLogin(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
