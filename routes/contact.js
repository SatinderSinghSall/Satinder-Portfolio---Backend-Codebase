const express = require("express");
const router = express.Router();

const ContactMessage = require("../models/ContactMessage");
const { verifyToken, requireAdmin } = require("../middleware/auth");
const sendEmail = require("../services/emailService");
const adminNotificationTemplate = require("../templates/adminNotificationTemplate");
const userAcknowledgementTemplate = require("../templates/userAcknowledgementTemplate");

//! Public route — send message
router.post("/", async (req, res) => {
  try {
    const msg = new ContactMessage(req.body);

    await msg.save();

    const { name, email, subject, message } = req.body;

    // Send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message from ${name}`,
      html: adminNotificationTemplate({
        name,
        email,
        subject,
        message,
      }),
      replyTo: email,
    });

    // Send acknowledgement to user
    await sendEmail({
      to: email,
      subject: "Thanks for contacting Satinder Singh Sall",
      html: userAcknowledgementTemplate({
        name,
      }),
    });

    res.status(201).json({
      message: "Message received successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to send message",
    });
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
