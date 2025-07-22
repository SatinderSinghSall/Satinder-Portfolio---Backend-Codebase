const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const { verifyToken, requireAdmin } = require("../middleware/auth");

//! GET all blogs with optional filters
router.get("/", async (req, res) => {
  const { status, tag } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (tag) filter.tags = tag;

  const blogs = await Blog.find(filter).sort({ createdAt: -1 });
  res.json(blogs);
});

//! GET single blog by ID
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json(blog);
});

//! CREATE blog (admin only)
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title, content, image, tags, author, summary, status } = req.body;
    const newBlog = new Blog({
      title,
      content,
      image,
      tags,
      author,
      summary,
      status,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch {
    res.status(400).json({ message: "Failed to create blog" });
  }
});

//! UPDATE blog (admin only)
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

//! DELETE blog (admin only)
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
