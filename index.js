const path = require("path");
const dotenv = require("dotenv");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: path.resolve(__dirname, envFile) });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//! To run the backend for DEVELOPMENT -> npm run dev
//! To run the backend for PRODUCTION -> npm start

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const blogRoutes = require("./routes/blog");
const contactRoutes = require("./routes/contact");
const dashboardRoutes = require("./routes/dashboard");
const youtubeRoutes = require("./routes/youtube");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://satinder-portfolio.vercel.app",
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/youtube", youtubeRoutes);

app.get("/", (req, res) => {
  res.send("Server & APIs is running...🚀");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server APIs running on port ${PORT} & database connected! 🚀`
      )
    );
  })
  .catch((err) => console.error(err));
