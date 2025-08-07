const mongoose = require("mongoose");

const youTubeVideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    thumbnail: { type: String },
    tags: [{ type: String }],
    author: { type: String, default: "Satinder" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("YouTubeVideo", youTubeVideoSchema);
