const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { verifyToken, requireAdmin } = require("../middleware/auth");
const parser = require("../middleware/cloudinaryUpload");

//! GET all projects (public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//! GET project by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    console.error("Error fetching project by ID:", err);
    res.status(500).json({ message: err.message });
  }
});

//! CREATE project (admin only)
router.post(
  "/",
  verifyToken,
  requireAdmin,
  parser.single("image"),
  async (req, res) => {
    try {
      const { title, description, link, technologies, githubLink } = req.body;
      const imageUrl = req.file?.path;

      const newProject = new Project({
        title,
        description,
        link,
        githubLink,
        image: imageUrl,
        technologies: technologies?.split(",").map((t) => t.trim()) || [],
      });

      await newProject.save();
      res.status(201).json(newProject);
    } catch (err) {
      console.error("Error creating project:", err);
      res.status(400).json({ message: "Failed to create project" });
    }
  }
);

//! UPDATE project (admin only)
router.put(
  "/:id",
  verifyToken,
  requireAdmin,
  parser.single("image"),
  async (req, res) => {
    try {
      const { title, description, link, technologies, githubLink } = req.body;
      const updateData = {
        title,
        description,
        link,
        githubLink,
        technologies: technologies?.split(",").map((t) => t.trim()) || [],
      };

      if (req.file?.path) {
        updateData.image = req.file.path;
      }

      const updated = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

      if (!updated)
        return res.status(404).json({ message: "Project not found" });

      res.json(updated);
    } catch (err) {
      console.error("Error updating project:", err);
      res.status(400).json({ message: "Update failed" });
    }
  }
);

//! DELETE project (admin only)
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(400).json({ message: "Delete failed" });
  }
});

module.exports = router;
