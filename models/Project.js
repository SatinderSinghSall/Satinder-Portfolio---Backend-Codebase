const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    technologies: { type: [String], required: true },
    githubLink: { type: String, required: true },
    link: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
