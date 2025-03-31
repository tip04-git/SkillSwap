require("dotenv").config();
const express = require("express");
const cors = require("cors");

const passport = require("passport");
const db = require("./config/db"); // Ensure DB connection is established
const skillsRoutes = require("./routes/skills");
const matchingRoutes = require("./routes/matching");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Parse JSON requests
app.use(passport.initialize()); // Initialize Passport for authentication
app.use("/api/matching", matchingRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("SkillSwap API is running...");
});

// Use API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/", skillsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
