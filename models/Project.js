const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    technologies: { type: [String], required: true },
    githubLink: { type: String, required: true },
    link: String,
    image: String,

    featured: { type: Boolean, default: false },
    priority: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
