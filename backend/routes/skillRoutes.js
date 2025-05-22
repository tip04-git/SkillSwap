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

  // ✅ Add a skill with interest level
router.post("/user-skills", async (req, res) => {
    try {
      const { user_id, skill_id, proficiency_level, interest_level } = req.body;
  
      const result = await pool.query(
        `INSERT INTO user_skills (user_id, skill_id, proficiency_level, interest_level)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (user_id, skill_id) 
         DO UPDATE SET proficiency_level = EXCLUDED.proficiency_level, interest_level = EXCLUDED.interest_level
         RETURNING *`,
        [user_id, skill_id, proficiency_level, interest_level]
      );
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error("❌ SQL Error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;