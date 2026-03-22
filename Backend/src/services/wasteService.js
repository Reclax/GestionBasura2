const store = require("../data/store");
const { REPORT_STATUS, ROUTE_STATUS } = require("../config/constants");

function createError(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function metricsFromReportsAndRoutes(reports, routes) {
  return {
    pending: reports.filter((item) => item.status === REPORT_STATUS.PENDING)
      .length,
    inRoute: reports.filter((item) => item.status === REPORT_STATUS.ON_ROUTE)
      .length,
    solved: reports.filter((item) => item.status === REPORT_STATUS.COLLECTED)
      .length,
    activeRoutes: routes.filter((item) => item.status === ROUTE_STATUS.ON_ROUTE)
      .length,
  };
}

function getAllData() {
  return {
    drivers: store.drivers,
    reports: store.reports,
    routes: store.routes,
    metrics: metricsFromReportsAndRoutes(store.reports, store.routes),
  };
}

function getDrivers() {
  return store.drivers;
}

function getReports() {
  return store.reports;
}

function createReport(payload) {
  const required = ["zone", "address", "reference"];
  const hasMissing = required.some((field) => !payload[field]);

  if (hasMissing) {
    throw createError("zone, address y reference son requeridos");
  }

  const newReport = {
    id: store.nextReportId,
    zone: payload.zone,
    address: payload.address,
    reference: payload.reference,
    severity: payload.severity || "Media",
    wasteType: payload.wasteType || "Mixto",
    notes: payload.notes || "",
    status: REPORT_STATUS.PENDING,
    createdAt: new Date().toISOString().slice(0, 10),
    assignedRouteId: null,
  };

  store.nextReportId += 1;
  store.reports = [newReport, ...store.reports];

  return newReport;
}

function updateReportStatus(reportId, status) {
  const report = store.reports.find((item) => item.id === Number(reportId));
  if (!report) {
    throw createError("Reporte no encontrado", 404);
  }

  report.status = status;
  return report;
}

function getRoutes() {
  return store.routes;
}

function createRoute(payload) {
  const required = [
    "name",
    "date",
    "shift",
    "truck",
    "driverId",
    "neighborhoods",
  ];
  const hasMissing = required.some((field) => !payload[field]);

  if (hasMissing) {
    throw createError("Faltan datos para crear la ruta");
  }

  const driverExists = store.drivers.some(
    (driver) => driver.id === payload.driverId,
  );
  if (!driverExists) {
    throw createError("Chofer invalido");
  }

  const newRoute = {
    id: store.nextRouteId,
    name: payload.name,
    date: payload.date,
    shift: payload.shift,
    truck: payload.truck,
    driverId: payload.driverId,
    neighborhoods: payload.neighborhoods,
    status: ROUTE_STATUS.PLANNED,
    completedStopIds: [],
    stops: [],
  };

  store.nextRouteId += 1;
  store.routes = [newRoute, ...store.routes];

  return newRoute;
}

function assignReportToRoute(routeId, reportId) {
  const route = store.routes.find((item) => item.id === Number(routeId));
  const report = store.reports.find((item) => item.id === Number(reportId));

  if (!route) {
    throw createError("Ruta no encontrada", 404);
  }

  if (!report) {
    throw createError("Reporte no encontrado", 404);
  }

  const alreadyInRoute = route.stops.some(
    (item) => item.reportId === report.id,
  );
  if (alreadyInRoute) {
    throw createError("El reporte ya esta asignado a esta ruta");
  }

  route.stops.push({ reportId: report.id });
  report.assignedRouteId = route.id;
  report.status = REPORT_STATUS.SCHEDULED;

  return route;
}

function startRoute(routeId) {
  const route = store.routes.find((item) => item.id === Number(routeId));

  if (!route) {
    throw createError("Ruta no encontrada", 404);
  }

  route.status = ROUTE_STATUS.ON_ROUTE;

  const stopIds = route.stops.map((item) => item.reportId);
  store.reports = store.reports.map((report) => {
    if (
      stopIds.includes(report.id) &&
      report.status !== REPORT_STATUS.COLLECTED
    ) {
      return { ...report, status: REPORT_STATUS.ON_ROUTE };
    }

    return report;
  });

  return route;
}

function toggleStop(routeId, reportId) {
  const route = store.routes.find((item) => item.id === Number(routeId));
  const report = store.reports.find((item) => item.id === Number(reportId));

  if (!route || !report) {
    throw createError("Ruta o reporte no encontrado", 404);
  }

  const stopExists = route.stops.some((item) => item.reportId === report.id);
  if (!stopExists) {
    throw createError("El reporte no pertenece a esta ruta");
  }

  const wasDone = route.completedStopIds.includes(report.id);
  if (wasDone) {
    route.completedStopIds = route.completedStopIds.filter(
      (id) => id !== report.id,
    );
    report.status = REPORT_STATUS.ON_ROUTE;
  } else {
    route.completedStopIds.push(report.id);
    report.status = REPORT_STATUS.COLLECTED;
  }

  return route;
}

function finishRoute(routeId) {
  const route = store.routes.find((item) => item.id === Number(routeId));
  if (!route) {
    throw createError("Ruta no encontrada", 404);
  }

  route.status = ROUTE_STATUS.COMPLETED;

  const stopIds = route.stops.map((item) => item.reportId);
  const completed = new Set(route.completedStopIds);

  store.reports = store.reports.map((report) => {
    if (!stopIds.includes(report.id)) {
      return report;
    }

    if (completed.has(report.id)) {
      return { ...report, status: REPORT_STATUS.COLLECTED };
    }

    return { ...report, status: REPORT_STATUS.SCHEDULED };
  });

  return route;
}

function getDriverRoutes(driverId) {
  return store.routes.filter((route) => route.driverId === driverId);
}

module.exports = {
  getAllData,
  getDrivers,
  getReports,
  createReport,
  updateReportStatus,
  getRoutes,
  createRoute,
  assignReportToRoute,
  startRoute,
  toggleStop,
  finishRoute,
  getDriverRoutes,
};
