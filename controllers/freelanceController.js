const FreelanceProject = require("../models/FreelanceProject");

/* CREATE */
const createProject = async (req, res) => {
  try {
    const project = await FreelanceProject.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: "Create failed" });
  }
};

/* GET ALL */
const getProjects = async (req, res) => {
  try {
    const projects = await FreelanceProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/* 🔥 GET SINGLE PROJECT (NEW) */
const getProjectById = async (req, res) => {
  try {
    const project = await FreelanceProject.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(400).json({ message: "Invalid project ID" });
  }
};

/* UPDATE */
const updateProject = async (req, res) => {
  try {
    const updated = await FreelanceProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updated);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
};

/* DELETE */
const deleteProject = async (req, res) => {
  try {
    await FreelanceProject.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
