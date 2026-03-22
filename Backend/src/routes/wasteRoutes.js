const express = require("express");
const controller = require("../controllers/wasteController");

const router = express.Router();

router.get("/health", controller.getHealth);
router.get("/dashboard", controller.getDashboard);

router.get("/drivers", controller.getDrivers);
router.get("/drivers/:driverId/routes", controller.getDriverRoutes);

router.get("/reports", controller.getReports);
router.post("/reports", controller.createReport);
router.patch("/reports/:reportId/status", controller.updateReportStatus);

router.get("/routes", controller.getRoutes);
router.post("/routes", controller.createRoute);
router.post("/routes/:routeId/assign-report", controller.assignReportToRoute);
router.post("/routes/:routeId/start", controller.startRoute);
router.post("/routes/:routeId/toggle-stop", controller.toggleStop);
router.post("/routes/:routeId/finish", controller.finishRoute);

module.exports = router;
