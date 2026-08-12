const Project = require("../models/Project");

/**
 * @desc    Get all projects (Sorted by featured, priority, manual order, newest)
 * @route   GET /api/projects
 * @access  Public
 */
const getAllProjects = async (req, res) => {
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
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/**
 * @desc    Get top featured projects (Homepage)
 * @route   GET /api/projects/featured/top
 * @access  Public
 */
const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true })
      .sort({ priority: -1, order: 1 })
      .limit(6);

    res.json(projects);
  } catch (err) {
    console.error("Error fetching featured projects:", err);
    res.status(500).json({ message: "Failed to fetch featured projects" });
  }
};

/**
 * @desc    Get popular projects by view count
 * @route   GET /api/projects/popular/top
 * @access  Public
 */
const getPopularProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ views: -1 }).limit(6);
    res.json(projects);
  } catch (err) {
    console.error("Error fetching popular projects:", err);
    res.status(500).json({ message: "Failed to fetch popular projects" });
  }
};

/**
 * @desc    Get single project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ message: "Invalid project ID or server error" });
  }
};

/**
 * @desc    Increment view count
 * @route   POST /api/projects/:id/view
 * @access  Public
 */
const incrementViews = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true },
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ success: true, views: project.views });
  } catch (err) {
    console.error("Error updating views:", err);
    res.status(500).json({ message: "Failed to update views" });
  }
};

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Private / Admin
 */
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      link,
      githubLink,
      technologies,
      featured,
      priority,
    } = req.body;

    // Handle Cloudinary Uploads
    const imageUrls = req.files?.map((file) => file.path) || [];

    // Parse tech stack safely (handles stringified array or array)
    let parsedTech = [];
    if (typeof technologies === "string") {
      parsedTech = technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (Array.isArray(technologies)) {
      parsedTech = technologies;
    }

    // Determine auto-increment order
    const lastProject = await Project.findOne().sort({ order: -1 });

    const newProject = new Project({
      title,
      description,
      link,
      githubLink,
      images: imageUrls,
      featured: featured === "true" || featured === true,
      priority: Number(priority) || 0,
      order: lastProject ? lastProject.order + 1 : 0,
      technologies: parsedTech,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error("Error creating project:", err);
    res
      .status(400)
      .json({ message: err.message || "Failed to create project" });
  }
};

/**
 * @desc    Update an existing project
 * @route   PUT /api/projects/:id
 * @access  Private / Admin
 */
const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      link,
      githubLink,
      technologies,
      featured,
      priority,
      existingImages, // Pass existing image URLs to keep
    } = req.body;

    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Parse tech stack
    let parsedTech = existingProject.technologies;
    if (typeof technologies === "string") {
      parsedTech = technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (Array.isArray(technologies)) {
      parsedTech = technologies;
    }

    // Retain selected existing images + append newly uploaded images
    let updatedImages = existingProject.images;
    if (existingImages) {
      updatedImages =
        typeof existingImages === "string" ? [existingImages] : existingImages;
    }
    if (req.files?.length) {
      const newImages = req.files.map((file) => file.path);
      updatedImages = [...updatedImages, ...newImages];
    }

    const updateData = {
      title,
      description,
      link,
      githubLink,
      images: updatedImages,
      featured: featured === "true" || featured === true,
      priority: Number(priority) || 0,
      technologies: parsedTech,
    };

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(400).json({ message: err.message || "Update failed" });
  }
};

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Private / Admin
 */
const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(400).json({ message: "Delete failed" });
  }
};

/**
 * @desc    Toggle project featured status
 * @route   PATCH /api/projects/:id/toggle-featured
 * @access  Private / Admin
 */
const toggleFeatured = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.featured = !project.featured;
    await project.save();

    res.json(project);
  } catch (err) {
    console.error("Error toggling featured status:", err);
    res.status(500).json({ message: "Toggle failed" });
  }
};

/**
 * @desc    Reorder projects (Drag & Drop)
 * @route   PUT /api/projects/reorder
 * @access  Private / Admin
 */
const reorderProjects = async (req, res) => {
  try {
    const { order } = req.body;

    if (!Array.isArray(order) || !order.length) {
      return res
        .status(400)
        .json({ message: "Invalid or empty order array provided" });
    }

    const bulkOps = order.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index },
      },
    }));

    await Project.bulkWrite(bulkOps);

    res.json({ success: true, message: "Reordered successfully" });
  } catch (err) {
    console.error("Error reordering projects:", err);
    res.status(500).json({ message: "Reorder failed" });
  }
};

module.exports = {
  getAllProjects,
  getFeaturedProjects,
  getPopularProjects,
  getProjectById,
  incrementViews,
  createProject,
  updateProject,
  deleteProject,
  toggleFeatured,
  reorderProjects,
};
