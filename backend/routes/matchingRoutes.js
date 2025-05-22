const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET /api/matching/:userId - Get matches for a user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Example query: get users with matching skills (customize as needed)
    const query = `
      SELECT u.id, u.name, array_agg(s.name) AS skills
      FROM users u
      JOIN user_skills us ON u.id = us.user_id
      JOIN skills s ON us.skill_id = s.id
      WHERE u.id != $1
      GROUP BY u.id
      LIMIT 10
    `;
    const { rows } = await pool.query(query, [userId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching matches" });
  }
});

// POST /api/matching - Find matches based on posted data
router.post("/", async (req, res) => {
  try {
    const { userId, skills } = req.body;
    // Example: find users with overlapping skills (customize as needed)
    const query = `
      SELECT u.id, u.name, array_agg(s.name) AS skills
      FROM users u
      JOIN user_skills us ON u.id = us.user_id
      JOIN skills s ON us.skill_id = s.id
      WHERE u.id != $1 AND s.name = ANY($2)
      GROUP BY u.id
      LIMIT 10
    `;
    const { rows } = await pool.query(query, [userId, skills]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error finding matches" });
  }
});

module.exports = router;