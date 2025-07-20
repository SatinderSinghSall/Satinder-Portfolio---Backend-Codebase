const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const blogRoutes = require("./routes/blog");
const contactRoutes = require("./routes/contact");

const app = express();

app.use(
  cors({
    origin: "https://satinder-portfolio.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Server & APIs is running...🚀");
});

//! Connect to MongoDB and start server:
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
