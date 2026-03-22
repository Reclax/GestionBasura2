const ROLES = [
  { key: "poblacion", label: "Poblacion" },
  { key: "administracion", label: "Administracion" },
  { key: "choferes", label: "Choferes" },
];

export function RoleTabs({ activeRole, onChange }) {
  return (
    <section className="glass animate-rise rounded-3xl p-3 sm:p-4">
      <div className="grid grid-cols-3 gap-2">
        {ROLES.map((role) => (
          <button
            key={role.key}
            type="button"
            onClick={() => onChange(role.key)}
            className={`role-button ${activeRole === role.key ? "active" : ""}`}
          >
            {role.label}
          </button>
        ))}
      </div>
    </section>
  );
}
