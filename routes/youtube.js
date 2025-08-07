const express = require("express");
const router = express.Router();
const YouTubeVideo = require("../models/YouTubeVideo");
const { verifyToken, requireAdmin } = require("../middleware/auth");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload image to Cloudinary
router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "thumbnails" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();
    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// GET all videos (optionally filtered)
router.get("/", async (req, res) => {
  const { status, tag } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (tag) filter.tags = tag;

  const videos = await YouTubeVideo.find(filter).sort({ createdAt: -1 });
  res.json(videos);
});

// GET single video by ID
router.get("/:id", async (req, res) => {
  const video = await YouTubeVideo.findById(req.params.id);
  if (!video) return res.status(404).json({ message: "Not found" });
  res.json(video);
});

// CREATE video (admin only)
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const video = new YouTubeVideo(req.body);
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE video (admin only)
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  const updated = await YouTubeVideo.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updated);
});

// DELETE video (admin only)
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  await YouTubeVideo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
