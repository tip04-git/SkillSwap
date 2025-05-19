const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  let { name, email, password, skills } = req.body;
  if (!skills) skills = []; // Default to empty array if not provided

  try {
    // ...rest of your code
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
    "INSERT INTO users (name, email, password, skills) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, hashedPassword, skills && skills.length ? skills : null]
  );

    res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

/// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = userResult.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Remove password before sending response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ token, user: userWithoutPassword });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;

