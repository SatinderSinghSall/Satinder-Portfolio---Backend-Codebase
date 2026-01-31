const mongoose = require("mongoose");

const freelanceProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    clientName: { type: String, required: true },
    clientCompany: String,
    projectUrl: String,

    description: { type: String, required: true },

    images: [String], // multiple images
    technologies: [String],

    testimonial: String,
    clientRating: {
      type: Number,
      min: 1,
      max: 5,
    },

    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "completed",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("FreelanceProject", freelanceProjectSchema);
