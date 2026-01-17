const express = require("express");
const router = express.Router();
const axios = require("axios");

// ✅ LinkTool fetch URL metadata
router.get("/fetch-url", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ success: 0 });

    const response = await axios.get(url);
    const html = response.data;

    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : url;

    return res.json({
      success: 1,
      meta: {
        title,
        description: "",
        image: { url: "" },
      },
    });
  } catch (err) {
    return res.json({ success: 0 });
  }
});

// ✅ Image upload via URL
router.post("/upload-image-url", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ success: 0 });

    return res.json({
      success: 1,
      file: {
        url,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: 0 });
  }
});

// ✅ Image upload by file (optional: for now return error)
router.post("/upload-image", async (req, res) => {
  return res.status(501).json({
    success: 0,
    message: "File upload not implemented yet. Use image by URL for now.",
  });
});

module.exports = router;
