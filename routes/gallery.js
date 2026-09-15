const express = require("express");

const router = express.Router();

const {
  getAllGallery,
  getAllGalleryAdmin,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
  togglePublished,
  reorderGallery,
} = require("../controllers/galleryController");

const { verifyToken, requireAdmin } = require("../middleware/auth");

const parser = require("../middleware/cloudinaryUpload");

// PUBLIC ROUTES

router.get("/", getAllGallery);

// ADMIN ROUTES

// Static route must come before /:id
router.get("/admin", verifyToken, requireAdmin, getAllGalleryAdmin);

router.put("/reorder", verifyToken, requireAdmin, reorderGallery);

router.post(
  "/",
  verifyToken,
  requireAdmin,
  parser.single("image"),
  createGallery,
);

router.put(
  "/:id",
  verifyToken,
  requireAdmin,
  parser.single("image"),
  updateGallery,
);

router.delete("/:id", verifyToken, requireAdmin, deleteGallery);

router.patch(
  "/:id/toggle-published",
  verifyToken,
  requireAdmin,
  togglePublished,
);

// Dynamic route at the bottom
router.get("/:id", getGalleryById);

module.exports = router;
