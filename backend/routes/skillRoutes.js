const express = require("express");
const router = express.Router();
const pool = require("../config/db"); 
// GET all skills
router.get("/skills", async (req, res) => {
    try {
      console.log("Fetching skills from database...");
      const result = await pool.query("SELECT * FROM skills");
      console.log("Skills fetched:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching skills:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  module.exports = router;