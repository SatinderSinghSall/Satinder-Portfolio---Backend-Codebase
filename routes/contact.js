const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");
const { verifyToken, requireAdmin } = require("../middleware/auth");

//! Public route — send message
router.post("/", async (req, res) => {
  try {
    const msg = new ContactMessage(req.body);
    await msg.save();
    res.status(201).json({ message: "Message received" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save message" });
  }
});

//! Admin route — get all messages
router.get("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

//! Admin route — delete message
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete message" });
  }
});

module.exports = router;
