const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getFeaturedProjects,
  getPopularProjects,
  getProjectById,
  incrementViews,
  createProject,
  updateProject,
  deleteProject,
  toggleFeatured,
  reorderProjects,
} = require("../controllers/projectController");

const { verifyToken, requireAdmin } = require("../middleware/auth");
const parser = require("../middleware/cloudinaryUpload");

// PUBLIC ROUTES
router.get("/", getAllProjects);
router.get("/featured/top", getFeaturedProjects);
router.get("/popular/top", getPopularProjects);
router.post("/:id/view", incrementViews);

// ADMIN ROUTES (STATIC PATHS FIRST)
router.put("/reorder", verifyToken, requireAdmin, reorderProjects);

router.post(
  "/",
  verifyToken,
  requireAdmin,
  parser.array("images", 10),
  createProject,
);

router.put(
  "/:id",
  verifyToken,
  requireAdmin,
  parser.array("images", 10),
  updateProject,
);

router.delete("/:id", verifyToken, requireAdmin, deleteProject);
router.patch("/:id/toggle-featured", verifyToken, requireAdmin, toggleFeatured);

// DYNAMIC ROUTE MUST BE AT THE VERY BOTTOM
router.get("/:id", getProjectById);

module.exports = router;
