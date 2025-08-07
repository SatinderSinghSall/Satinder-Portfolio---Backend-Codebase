const Project = require("../models/Project");
const Blog = require("../models/Blog");
const Contact = require("../models/ContactMessage");
const YouTube = require("../models/YouTubeVideo");

const getDashboardStats = async (req, res) => {
  try {
    const projectsCount = await Project.countDocuments();
    const blogsCount = await Blog.countDocuments();
    const messagesCount = await Contact.countDocuments();
    const youTubeCount = await YouTube.countDocuments();

    res.json({
      projectsCount,
      blogsCount,
      messagesCount,
      youTubeCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getDashboardStats };
