const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const { verifyToken, requireAdmin } = require("../middleware/auth");

// Helper: slug generator
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Helper: ensure unique slug
async function generateUniqueSlug(title) {
  const base = slugify(title);
  let slug = base;
  let count = 1;

  while (await Blog.exists({ slug })) {
    slug = `${base}-${count++}`;
  }
  return slug;
}

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const { status, tag, category, featured, search, sort } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (tag) filter.tags = tag;
    if (category) filter.category = category;
    if (featured === "true") filter.featured = true;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    let sortQuery = { createdAt: -1 };
    if (sort === "oldest") sortQuery = { createdAt: 1 };
    if (sort === "latest") sortQuery = { createdAt: -1 };
    if (sort === "popular") sortQuery = { views: -1 };

    const blogs = await Blog.find(filter).sort(sortQuery);
    res.json(blogs);
  } catch {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

// ✅ GET blog by slug (PUBLIC)
router.get("/slug/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

// GET single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

// CREATE blog (admin only)
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const {
      title,
      summary,

      editorType, // ✅ NEW

      content, // markdown
      contentBlocks, // editorjs

      image,
      ogImage,
      tags,
      category,
      author,
      status,
      featured,
      metaTitle,
      metaDescription,
      scheduledAt,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const finalEditorType = editorType === "markdown" ? "markdown" : "editorjs";

    // ✅ Validate based on editor type
    if (finalEditorType === "markdown") {
      if (!content || !content.trim()) {
        return res
          .status(400)
          .json({ message: "Markdown content is required" });
      }
    }

    if (finalEditorType === "editorjs") {
      const hasBlocks = contentBlocks?.blocks?.length > 0;
      if (!hasBlocks) {
        return res
          .status(400)
          .json({ message: "EditorJS blocks are required" });
      }
    }

    const slug = await generateUniqueSlug(title);

    const blog = new Blog({
      title,
      slug,
      summary,

      editorType: finalEditorType,

      // store both always (safe)
      content: content || "",
      contentBlocks: contentBlocks || {
        time: Date.now(),
        blocks: [],
        version: "2.28.2",
      },

      image,
      ogImage,
      tags: Array.isArray(tags) ? tags : [],
      category: category || "General",
      author: author || "Admin",
      status: status || "draft",
      featured: !!featured,
      metaTitle,
      metaDescription,
      scheduledAt: scheduledAt || null,
      publishedAt: status === "published" ? new Date() : null,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch {
    res.status(400).json({ message: "Failed to create blog" });
  }
});

// UPDATE blog (admin only)
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const existing = await Blog.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    // if title changes -> regenerate slug
    if (req.body.title && req.body.title !== existing.title) {
      req.body.slug = await generateUniqueSlug(req.body.title);
    }

    // validate editor type update
    const finalEditorType =
      req.body.editorType === "markdown"
        ? "markdown"
        : req.body.editorType === "editorjs"
          ? "editorjs"
          : existing.editorType;

    if (finalEditorType === "markdown") {
      if (req.body.content !== undefined && !req.body.content.trim()) {
        return res
          .status(400)
          .json({ message: "Markdown content cannot be empty" });
      }
    }

    if (finalEditorType === "editorjs") {
      if (req.body.contentBlocks !== undefined) {
        const hasBlocks = req.body.contentBlocks?.blocks?.length > 0;
        if (!hasBlocks) {
          return res
            .status(400)
            .json({ message: "EditorJS blocks cannot be empty" });
        }
      }
    }

    req.body.editorType = finalEditorType;

    // if status becomes published -> set publishedAt
    if (req.body.status === "published" && !existing.publishedAt) {
      req.body.publishedAt = new Date();
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch {
    res.status(400).json({ message: "Failed to update blog" });
  }
});

// DELETE blog (admin only)
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
});

module.exports = router;
