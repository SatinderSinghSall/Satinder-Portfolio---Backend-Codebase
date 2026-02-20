const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { verifyToken, requireAdmin } = require("../middleware/auth");
const parser = require("../middleware/cloudinaryUpload");

// PUBLIC ROUTES

/**
 * GET all projects
 * Sorting priority:
 * 1. featured
 * 2. priority
 * 3. manual order
 * 4. newest
 */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({
      featured: -1,
      priority: -1,
      order: 1,
      createdAt: -1,
    });

    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET featured projects (homepage)
router.get("/featured/top", async (req, res) => {
  try {
    const projects = await Project.find({ featured: true })
      .sort({ priority: -1, order: 1 })
      .limit(6);

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch featured projects" });
  }
});

// GET popular projects
router.get("/popular/top", async (req, res) => {
  try {
    const projects = await Project.find().sort({ views: -1 }).limit(6);

    res.json(projects);
  } catch {
    res.status(500).json({ message: "Failed to fetch popular projects" });
  }
});

// Increment views (popularity)
router.post("/:id/view", async (req, res) => {
  try {
    await Project.updateOne({ _id: req.params.id }, { $inc: { views: 1 } });

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to update views" });
  }
});

// ADMIN ROUTES

// CREATE project
router.post(
  "/",
  verifyToken,
  requireAdmin,
  parser.single("image"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        link,
        technologies,
        githubLink,
        featured,
        priority,
      } = req.body;

      const imageUrl = req.file?.path;

      // assign next order automatically
      const lastProject = await Project.findOne().sort({ order: -1 });

      const newProject = new Project({
        title,
        description,
        link,
        githubLink,
        image: imageUrl,
        featured: featured === "true",
        priority: Number(priority) || 0,
        order: lastProject ? lastProject.order + 1 : 0,
        technologies: technologies?.split(",").map((t) => t.trim()) || [],
      });

      await newProject.save();
      res.status(201).json(newProject);
    } catch (err) {
      console.error("Error creating project:", err);
      res.status(400).json({ message: "Failed to create project" });
    }
  },
);

// UPDATE project
router.put(
  "/:id",
  verifyToken,
  requireAdmin,
  parser.single("image"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        link,
        technologies,
        githubLink,
        featured,
        priority,
      } = req.body;

      const updateData = {
        title,
        description,
        link,
        githubLink,
        featured: featured === "true",
        priority: Number(priority) || 0,
        technologies: technologies?.split(",").map((t) => t.trim()) || [],
      };

      if (req.file?.path) {
        updateData.image = req.file.path;
      }

      const updated = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true },
      );

      if (!updated)
        return res.status(404).json({ message: "Project not found" });

      res.json(updated);
    } catch (err) {
      console.error("Error updating project:", err);
      res.status(400).json({ message: "Update failed" });
    }
  },
);

// DELETE project
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

// Toggle featured status
router.patch(
  "/:id/toggle-featured",
  verifyToken,
  requireAdmin,
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: "Not found" });

      project.featured = !project.featured;
      await project.save();

      res.json(project);
    } catch {
      res.status(500).json({ message: "Toggle failed" });
    }
  },
);

/**
 * Drag & drop reorder
 */
router.put("/reorder", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { order } = req.body;

    if (!order || !order.length) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const bulkOps = order.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index },
      },
    }));

    await Project.bulkWrite(bulkOps);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Reorder failed" });
  }
});

// MUST BE LAST (dynamic route)

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
