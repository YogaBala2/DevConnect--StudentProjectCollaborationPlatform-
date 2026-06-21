const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  createReport,
  getProjectReports,
} = require(
  "../controllers/dailyReportController"
);

router.post(
  "/",
  protect,
  createReport
);

router.get(
  "/project/:projectId",
  protect,
  getProjectReports
);

module.exports = router;