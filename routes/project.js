const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { verifyToken, requireAdmin } = require("../middleware/auth");

//! GET all projects (public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//! CREATE project (admin only)
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: "Failed to create project" });
  }
});

//! UPDATE project (admin only)
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

//! DELETE project (admin only)
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
});

module.exports = router;
