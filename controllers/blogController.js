const Blog = require("../models/Blog");

// Helper function to convert title into a clean slug
const slugify = (text) => {
  return text
    ? text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // replace spaces with -
        .replace(/[^\w-]+/g, "") // remove non-word characters
        .replace(/--+/g, "-") // replace multiple - with single -
    : "";
};

// Helper to ensure unique slug in MongoDB
const generateUniqueSlug = async (title, currentBlogId = null) => {
  let baseSlug = slugify(title);
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const existing = await Blog.findOne({ slug });
    if (
      !existing ||
      (currentBlogId && existing._id.toString() === currentBlogId.toString())
    ) {
      return slug;
    }
    slug = `${baseSlug}-${count}`;
    count++;
  }
};

/**
 * @desc    Get all blogs (Public: Filtered by published status | Admin: All)
 * @route   GET /api/blogs
 * @access  Public
 */
exports.getBlogs = async (req, res) => {
  try {
    const {
      search,
      category,
      status,
      tag,
      featured,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Filter by search term (Title or Summary)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by tag
    if (tag) {
      query.tags = tag;
    }

    // Filter by featured
    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    // Filter by status (If status is provided, use it, otherwise show published by default)
    if (status) {
      query.status = status;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single blog by slug
 * @route   GET /api/blogs/slug/:slug
 * @access  Public
 */
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    // Increment view count automatically on public fetch
    blog.views += 1;
    await blog.save();

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single blog by ID
 * @route   GET /api/blogs/:id
 * @access  Public / Admin
 */
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Create a new blog
 * @route   POST /api/blogs
 * @access  Private / Admin
 */
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      summary,
      content,
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

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and content are required." });
    }

    // Generate unique slug
    const finalSlug = slug ? slugify(slug) : await generateUniqueSlug(title);

    // Format tags array if passed as a string
    const formattedTags = Array.isArray(tags)
      ? tags.map((t) => t.trim())
      : typeof tags === "string"
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

    // Set publishedAt date if status is published
    const publishedAt = status === "published" ? new Date() : null;

    const blog = await Blog.create({
      title,
      slug: finalSlug,
      summary,
      content,
      image,
      ogImage,
      tags: formattedTags,
      category,
      author,
      status: status || "draft",
      featured: featured || false,
      metaTitle,
      metaDescription,
      scheduledAt: scheduledAt || null,
      publishedAt,
    });

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update an existing blog
 * @route   PUT /api/blogs/:id
 * @access  Private / Admin
 */
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    const {
      title,
      slug,
      summary,
      content,
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

    // Re-generate slug if updated or title changes
    if (slug || title) {
      blog.slug = await generateUniqueSlug(slug || title, blog._id);
    }

    if (title !== undefined) blog.title = title;
    if (summary !== undefined) blog.summary = summary;
    if (content !== undefined) blog.content = content;
    if (image !== undefined) blog.image = image;
    if (ogImage !== undefined) blog.ogImage = ogImage;
    if (category !== undefined) blog.category = category;
    if (author !== undefined) blog.author = author;
    if (featured !== undefined) blog.featured = featured;
    if (metaTitle !== undefined) blog.metaTitle = metaTitle;
    if (metaDescription !== undefined) blog.metaDescription = metaDescription;
    if (scheduledAt !== undefined) blog.scheduledAt = scheduledAt;

    if (tags !== undefined) {
      blog.tags = Array.isArray(tags)
        ? tags.map((t) => t.trim())
        : typeof tags === "string"
          ? tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [];
    }

    // Handle published date transition
    if (status !== undefined) {
      if (status === "published" && blog.status !== "published") {
        blog.publishedAt = new Date();
      }
      blog.status = status;
    }

    const updatedBlog = await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a blog post
 * @route   DELETE /api/blogs/:id
 * @access  Private / Admin
 */
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
