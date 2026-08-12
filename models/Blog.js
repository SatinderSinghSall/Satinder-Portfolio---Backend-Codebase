const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },

    summary: { type: String, trim: true, maxlength: 250 },

    // Pure Markdown Content
    content: { type: String, required: true, default: "" },

    image: { type: String, trim: true },
    ogImage: { type: String, trim: true },

    tags: [{ type: String, trim: true }],
    category: { type: String, trim: true, default: "General" },

    author: { type: String, default: "Admin" },

    status: { type: String, enum: ["draft", "published"], default: "draft" },

    featured: { type: Boolean, default: false },

    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true, maxlength: 160 },

    scheduledAt: { type: Date, default: null },
    publishedAt: { type: Date, default: null },

    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
