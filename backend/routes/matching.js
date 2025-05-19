const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// 🔥 Hybrid Matching API - Match users based on skills, proficiency & interest
router.get("/match/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10); // Ensure userId is an integer
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const query = `
      
        SELECT u1.user_id AS user1, u2.user_id AS user2, u1.skill_id,
         u1.proficiency_level AS user1_proficiency,
         u2.proficiency_level AS user2_proficiency,
         u1.interest_level AS user1_interest,
         u2.interest_level AS user2_interest,
         (0.7 * (1 - ABS(
            CASE 
                WHEN u1.proficiency_level = 'Beginner' THEN 1
                WHEN u1.proficiency_level = 'Intermediate' THEN 2
                WHEN u1.proficiency_level = 'Advanced' THEN 3
                ELSE 0
            END
            -
            CASE 
                WHEN u2.proficiency_level = 'Beginner' THEN 1
                WHEN u2.proficiency_level = 'Intermediate' THEN 2
                WHEN u2.proficiency_level = 'Advanced' THEN 3
                ELSE 0
            END
         ) / 4) + 
         0.3 * ((u1.interest_level + u2.interest_level) / 10)) AS match_score
  FROM user_skills u1
  JOIN user_skills u2 ON u1.skill_id = u2.skill_id AND u1.user_id < u2.user_id
  WHERE u1.user_id = $1
  ORDER BY match_score DESC;
`;


    const result = await pool.query(query, [userId]); // Pass userId as a parameter
    res.json(result.rows);
  } catch (error) {
    console.error("Error in skill matching:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

