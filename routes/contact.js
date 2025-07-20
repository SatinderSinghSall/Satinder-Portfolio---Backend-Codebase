const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

router.post("/", async (req, res) => {
  const msg = new ContactMessage(req.body);
  await msg.save();
  res.status(201).json({ message: "Message received" });
});

module.exports = router;
