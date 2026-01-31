const express = require("express");
const router = express.Router();
const upload = require("../middleware/cloudinaryUpload");
const { verifyToken, requireAdmin } = require("../middleware/auth");

// Single image upload (used multiple times from frontend)
router.post(
  "/",
  verifyToken,
  requireAdmin,
  upload.single("image"),
  (req, res) => {
    try {
      res.status(200).json({
        url: req.file.path,
      });
    } catch (err) {
      res.status(400).json({ message: "Upload failed" });
    }
  },
);

module.exports = router;
