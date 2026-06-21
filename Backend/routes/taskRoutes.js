const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  createTask,
  getProjectTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require(
  "../controllers/taskController"
);

router.post(
  "/",
  protect,
  createTask
);

router.get(
  "/project/:projectId",
  protect,
  getProjectTasks
);

router.put(
  "/:id",
  protect,
  updateTask
);

router.put(
  "/status/:id",
  protect,
  updateTaskStatus
);

router.delete(
  "/:id",
  protect,
  deleteTask
);

module.exports = router;