const pool = require("../config/db");
const User = require('../models/User');
// User model
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      skills TEXT[],
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log("✅ User table created");
};

// Call the function to create the table
createUserTable();

// Route to fetch user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);  // Replace with your authentication method
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);  // Send user data as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});
module.exports = pool;
