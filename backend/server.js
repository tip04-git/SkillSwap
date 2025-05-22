require("dotenv").config();
const express = require("express");
const cors = require("cors");

const passport = require("passport");
const db = require("./config/db"); // Ensure DB connection is established

const matchingRoutes = require("./routes/matchingRoutes");
const skillRoutes = require("./routes/skillRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors({origin: 'http://localhost:5173',
  credentials: true
})); // Enable cross-origin requests
app.use(express.json()); // Parse JSON requests
app.use(passport.initialize()); // Initialize Passport for authentication

// Test route
app.get("/", (req, res) => {
  res.send("SkillSwap API is running...");
});

// Use API Routes
app.use("/api/matching", matchingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", skillRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
