const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const MONGODB_URI =
  "mongodb+srv://satindersinghsall111:VJ3ZacJ1iNlRrnSW@satinder-portfolio-db.zlptgun.mongodb.net/Satinder-Portfolio-DB?retryWrites=true&w=majority&appName=Satinder-Portfolio-DB";

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Hash password and create admin user
    const hashedPassword = await bcrypt.hash("Satinder@123", 10);
    const user = new User({
      email: "satindersinghsall111@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await user.save();
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    // Close the connection after operation
    await mongoose.disconnect();
  }
};

createAdmin();
