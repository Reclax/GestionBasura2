const PORT = process.env.PORT || 3000;

const REPORT_STATUS = {
  PENDING: "Pendiente",
  REVIEW: "En revision",
  SCHEDULED: "Programado",
  ON_ROUTE: "En ruta",
  COLLECTED: "Recolectado",
};

const ROUTE_STATUS = {
  PLANNED: "Planificada",
  ON_ROUTE: "En ruta",
  COMPLETED: "Completada",
};

module.exports = {
  PORT,
  REPORT_STATUS,
  ROUTE_STATUS,
};
