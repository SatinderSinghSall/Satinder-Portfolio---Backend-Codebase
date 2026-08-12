const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const { verifyToken, requireAdmin } = require("../middleware/auth");

// Public Routes
router.get("/", getBlogs);
router.get("/slug/:slug", getBlogBySlug);
router.get("/:id", getBlogById);

// Protected Admin Routes
router.post("/", verifyToken, requireAdmin, createBlog);
router.put("/:id", verifyToken, requireAdmin, updateBlog);
router.delete("/:id", verifyToken, requireAdmin, deleteBlog);

module.exports = router;
