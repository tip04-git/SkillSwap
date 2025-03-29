const express = require("express");
const router = express.Router();
const pool = require("../config/db");

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
  
  
  

// ✅ Update interest level for a skill
router.put("/user-skills/:user_id/:skill_id", async (req, res) => {
  const { user_id, skill_id } = req.params;
  const { interest_level } = req.body;

  if (!interest_level || interest_level < 1 || interest_level > 5) {
    return res.status(400).json({ error: "Interest level must be between 1 and 5" });
  }

  try {
    const result = await pool.query(
      "UPDATE user_skills SET interest_level = $1 WHERE user_id = $2 AND skill_id = $3 RETURNING *",
      [interest_level, user_id, skill_id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Skill not found for user" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating interest level:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
