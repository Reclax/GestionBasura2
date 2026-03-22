const wasteService = require("../services/wasteService");

function sendOk(res, data, status = 200) {
  res.status(status).json({ success: true, data });
}

function getHealth(_req, res) {
  sendOk(res, { message: "API operativa" });
}

function getDashboard(_req, res, next) {
  try {
    sendOk(res, wasteService.getAllData());
  } catch (error) {
    next(error);
  }
}

function getDrivers(_req, res, next) {
  try {
    sendOk(res, wasteService.getDrivers());
  } catch (error) {
    next(error);
  }
}

function getReports(_req, res, next) {
  try {
    sendOk(res, wasteService.getReports());
  } catch (error) {
    next(error);
  }
}

function createReport(req, res, next) {
  try {
    sendOk(res, wasteService.createReport(req.body), 201);
  } catch (error) {
    next(error);
  }
}

function updateReportStatus(req, res, next) {
  try {
    sendOk(
      res,
      wasteService.updateReportStatus(req.params.reportId, req.body.status),
    );
  } catch (error) {
    next(error);
  }
}

function getRoutes(_req, res, next) {
  try {
    sendOk(res, wasteService.getRoutes());
  } catch (error) {
    next(error);
  }
}

function createRoute(req, res, next) {
  try {
    sendOk(res, wasteService.createRoute(req.body), 201);
  } catch (error) {
    next(error);
  }
}

function assignReportToRoute(req, res, next) {
  try {
    sendOk(
      res,
      wasteService.assignReportToRoute(req.params.routeId, req.body.reportId),
    );
  } catch (error) {
    next(error);
  }
}

function startRoute(req, res, next) {
  try {
    sendOk(res, wasteService.startRoute(req.params.routeId));
  } catch (error) {
    next(error);
  }
}

function toggleStop(req, res, next) {
  try {
    sendOk(res, wasteService.toggleStop(req.params.routeId, req.body.reportId));
  } catch (error) {
    next(error);
  }
}

function finishRoute(req, res, next) {
  try {
    sendOk(res, wasteService.finishRoute(req.params.routeId));
  } catch (error) {
    next(error);
  }
}

function getDriverRoutes(req, res, next) {
  try {
    sendOk(res, wasteService.getDriverRoutes(req.params.driverId));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getHealth,
  getDashboard,
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
