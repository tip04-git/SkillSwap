const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Route to get user profile data
router.get("/profile", async (req, res) => {
    try {
      const userId = req.user.id; // Assuming JWT contains user ID
  
      // Query to get user profile data along with skills
      const query = `
        SELECT u.id, u.name, u.email, array_agg(s.name) AS skills
        FROM users u
        LEFT JOIN user_skills us ON u.id = us.user_id
        LEFT JOIN skills s ON us.skill_id = s.id
        WHERE u.id = $1
        GROUP BY u.id
      `;
      const { rows } = await pool.query(query, [userId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching user profile" });
    }
  });
  

module.exports = router;
