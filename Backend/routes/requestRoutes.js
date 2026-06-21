const express = require("express");

const router = express.Router();

const {
  applyToProject,
  getProjectRequests,
  acceptRequest,
  rejectRequest,
  getMyRequests,
} = require(
  "../controllers/requestController"
);

const protect = require("../middleware/authMiddleware");
router.post(
  "/apply",
  protect,
  applyToProject
);
router.get(
  "/my",
  protect,
  getMyRequests
);
router.get(
  "/project/:projectId",
  protect,
  getProjectRequests
);

router.put(
  "/accept/:id",
  protect,
  acceptRequest
);

router.put(
  "/reject/:id",
  protect,
  rejectRequest
);

module.exports = router;