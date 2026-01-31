const express = require("express");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/freelanceController");

const { verifyToken, requireAdmin } = require("../middleware/auth");

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */

// GET ALL PROJECTS
router.get("/", getProjects);

// GET SINGLE PROJECT
router.get("/:id", getProjectById);

/* ================= ADMIN ROUTES ================= */

router.post("/", verifyToken, requireAdmin, createProject);
router.put("/:id", verifyToken, requireAdmin, updateProject);
router.delete("/:id", verifyToken, requireAdmin, deleteProject);

module.exports = router;
