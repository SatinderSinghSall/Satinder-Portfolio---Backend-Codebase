const Project = require("../models/Project");
const Blog = require("../models/Blog");
const Contact = require("../models/ContactMessage");
const YouTube = require("../models/YouTubeVideo");
const Freelance = require("../models/FreelanceProject");
const User = require("../models/User");
const Gallery = require("../models/Gallery");

const getDashboardStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const projectsCount = await Project.countDocuments();
    const blogsCount = await Blog.countDocuments();
    const messagesCount = await Contact.countDocuments();
    const youTubeCount = await YouTube.countDocuments();
    const freelanceCount = await Freelance.countDocuments();
    const galleryCount = await Gallery.countDocuments();

    res.json({
      usersCount,
      projectsCount,
      blogsCount,
      messagesCount,
      youTubeCount,
      freelanceCount,
      galleryCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getDashboardStats };
