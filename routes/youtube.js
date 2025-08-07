const express = require("express");
const router = express.Router();
const YouTubeVideo = require("../models/YouTubeVideo");
const { verifyToken, requireAdmin } = require("../middleware/auth");

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
