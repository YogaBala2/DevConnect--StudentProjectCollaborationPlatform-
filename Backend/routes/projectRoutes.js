const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getMyProjects,
  getSkillMatch,
  getProjectMembers,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");
// Create Project
router.post("/", protect, createProject);

// Get All Projects
router.get("/", getProjects);

// Get My Projects
router.get(
  "/my/projects",
  protect,
  getMyProjects
);
router.get(
  "/match/:projectId",
  protect,
  getSkillMatch
);
router.get(
  "/:id/members",
  protect,
  getProjectMembers
);
// Get Single Project
router.get(
  "/:id",
  getProjectById
);

// Update Project
router.put(
  "/:id",
  protect,
  updateProject
);

// Delete Project
router.delete(
  "/:id",
  protect,
  deleteProject
);

module.exports = router;