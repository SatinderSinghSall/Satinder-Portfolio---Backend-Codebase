const Project = require("../models/Project");
const Blog = require("../models/Blog");
const Contact = require("../models/ContactMessage");

const getDashboardStats = async (req, res) => {
  try {
    const projectsCount = await Project.countDocuments();
    const blogsCount = await Blog.countDocuments();
    const messagesCount = await Contact.countDocuments();

    res.json({
      projectsCount,
      blogsCount,
      messagesCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getDashboardStats };
