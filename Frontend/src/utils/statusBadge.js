export function statusBadge(status) {
  switch (status) {
    case "Pendiente":
      return "bg-rose-100 text-rose-700 ring-rose-200";
    case "En revision":
      return "bg-amber-100 text-amber-700 ring-amber-200";
    case "Programado":
      return "bg-sky-100 text-sky-700 ring-sky-200";
    case "En ruta":
      return "bg-violet-100 text-violet-700 ring-violet-200";
    case "Recolectado":
      return "bg-emerald-100 text-emerald-700 ring-emerald-200";
    case "Completada":
      return "bg-emerald-100 text-emerald-700 ring-emerald-200";
    default:
      return "bg-zinc-100 text-zinc-700 ring-zinc-200";
  }
}
