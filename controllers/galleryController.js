const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

/**
 * @desc    Get all published gallery items
 * @route   GET /api/gallery
 * @access  Public
 */
const getAllGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find({ isPublished: true }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(galleries);
  } catch (err) {
    console.error("Error fetching gallery:", err);
    res.status(500).json({ message: "Failed to fetch gallery" });
  }
};

/**
 * @desc    Get all gallery items for admin
 * @route   GET /api/gallery/admin
 * @access  Private / Admin
 */
const getAllGalleryAdmin = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.json(galleries);
  } catch (err) {
    console.error("Error fetching admin gallery:", err);
    res.status(500).json({ message: "Failed to fetch gallery" });
  }
};

/**
 * @desc    Get single gallery item
 * @route   GET /api/gallery/:id
 * @access  Public
 */
const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery || !gallery.isPublished) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.json(gallery);
  } catch (err) {
    console.error("Error fetching gallery item:", err);
    res.status(500).json({
      message: "Invalid gallery ID or server error",
    });
  }
};

/**
 * @desc    Create a new gallery item
 * @route   POST /api/gallery
 * @access  Private / Admin
 */
const createGallery = async (req, res) => {
  try {
    const { title, description, category, order, isPublished } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Gallery title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Gallery image is required",
      });
    }

    // Cloudinary upload details from multer-storage-cloudinary
    const imageUrl = req.file.path;
    const cloudinaryPublicId = req.file.filename;

    // Automatically place new item at the end
    const lastGallery = await Gallery.findOne().sort({ order: -1 });

    const newGallery = new Gallery({
      title: title.trim(),
      description: description?.trim() || "",
      category: category?.trim() || "General",
      imageUrl,
      cloudinaryPublicId,
      order:
        order !== undefined && order !== ""
          ? Number(order)
          : lastGallery
            ? lastGallery.order + 1
            : 0,
      isPublished:
        isPublished === undefined
          ? true
          : isPublished === "true" || isPublished === true,
    });

    await newGallery.save();

    res.status(201).json(newGallery);
  } catch (err) {
    console.error("Error creating gallery item:", err);

    // If database save fails after Cloudinary upload,
    // try to remove the uploaded image.
    if (req.file?.filename) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (cloudinaryError) {
        console.error("Failed to cleanup Cloudinary image:", cloudinaryError);
      }
    }

    res.status(400).json({
      message: err.message || "Failed to create gallery item",
    });
  }
};

/**
 * @desc    Update an existing gallery item
 * @route   PUT /api/gallery/:id
 * @access  Private / Admin
 */
const updateGallery = async (req, res) => {
  try {
    const { title, description, category, order, isPublished } = req.body;

    const existingGallery = await Gallery.findById(req.params.id);

    if (!existingGallery) {
      return res.status(404).json({
        message: "Gallery item not found",
      });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Gallery title is required",
      });
    }

    const updateData = {
      title: title.trim(),
      description: description?.trim() || "",
      category: category?.trim() || "General",
      order:
        order !== undefined && order !== ""
          ? Number(order)
          : existingGallery.order,
      isPublished:
        isPublished === undefined
          ? existingGallery.isPublished
          : isPublished === "true" || isPublished === true,
    };

    // If a new image was uploaded
    if (req.file) {
      const newImageUrl = req.file.path;
      const newCloudinaryPublicId = req.file.filename;

      updateData.imageUrl = newImageUrl;
      updateData.cloudinaryPublicId = newCloudinaryPublicId;

      // Delete old Cloudinary image
      if (existingGallery.cloudinaryPublicId) {
        try {
          await cloudinary.uploader.destroy(existingGallery.cloudinaryPublicId);
        } catch (cloudinaryError) {
          console.error(
            "Failed to delete old Cloudinary image:",
            cloudinaryError,
          );
        }
      }
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    res.json(updatedGallery);
  } catch (err) {
    console.error("Error updating gallery item:", err);

    res.status(400).json({
      message: err.message || "Failed to update gallery item",
    });
  }
};

/**
 * @desc    Delete a gallery item
 * @route   DELETE /api/gallery/:id
 * @access  Private / Admin
 */
const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery item not found",
      });
    }

    // Delete image from Cloudinary
    if (gallery.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(gallery.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error("Failed to delete Cloudinary image:", cloudinaryError);
      }
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting gallery item:", err);

    res.status(400).json({
      message: "Delete failed",
    });
  }
};

/**
 * @desc    Toggle gallery published status
 * @route   PATCH /api/gallery/:id/toggle-published
 * @access  Private / Admin
 */
const togglePublished = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery item not found",
      });
    }

    gallery.isPublished = !gallery.isPublished;

    await gallery.save();

    res.json(gallery);
  } catch (err) {
    console.error("Error toggling gallery status:", err);

    res.status(500).json({
      message: "Failed to update published status",
    });
  }
};

/**
 * @desc    Reorder gallery items
 * @route   PUT /api/gallery/reorder
 * @access  Private / Admin
 */
const reorderGallery = async (req, res) => {
  try {
    const { order } = req.body;

    if (!Array.isArray(order) || !order.length) {
      return res.status(400).json({
        message: "Invalid or empty order array provided",
      });
    }

    const bulkOps = order.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index },
      },
    }));

    await Gallery.bulkWrite(bulkOps);

    res.json({
      success: true,
      message: "Gallery reordered successfully",
    });
  } catch (err) {
    console.error("Error reordering gallery:", err);

    res.status(500).json({
      message: "Reorder failed",
    });
  }
};

module.exports = {
  getAllGallery,
  getAllGalleryAdmin,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
  togglePublished,
  reorderGallery,
};
