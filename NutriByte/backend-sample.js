// Sample Express.js backend implementation for JWT verification with Clerk
const express = require('express');
const { Clerk } = require('@clerk/clerk-sdk-node');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Clerk with your secret key
const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

// Initialize PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware to verify JWT token from Clerk
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the token with Clerk
    const { sub: userId } = await clerk.verifyToken(token);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    
    // Add the userId to the request object
    req.userId = userId;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Route to create a user profile
app.post('/users/createProfile', verifyToken, async (req, res) => {
  try {
    const { age, weight, height, goal, activityLevel, dietaryRestrictions, userId } = req.body;
    
    // Verify that the userId from the token matches the userId in the request
    if (req.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: User ID mismatch' });
    }
    
    // Check if user already has a profile
    const existingProfile = await pool.query(
      'SELECT * FROM user_profiles WHERE user_id = $1',
      [userId]
    );
    
    if (existingProfile.rows.length > 0) {
      // Update existing profile
      const updatedProfile = await pool.query(
        `UPDATE user_profiles 
         SET age = $1, weight = $2, height = $3, goal = $4, activity_level = $5, dietary_restrictions = $6
         WHERE user_id = $7
         RETURNING *`,
        [age, weight, height, goal, activityLevel, dietaryRestrictions, userId]
      );
      
      return res.status(200).json({ 
        message: 'Profile updated successfully',
        profile: updatedProfile.rows[0]
      });
    }
    
    // Create new profile
    const newProfile = await pool.query(
      `INSERT INTO user_profiles (user_id, age, weight, height, goal, activity_level, dietary_restrictions)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userId, age, weight, height, goal, activityLevel, dietaryRestrictions]
    );
    
    return res.status(201).json({
      message: 'Profile created successfully',
      profile: newProfile.rows[0]
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to check if user has a profile
app.get('/users/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    
    const profile = await pool.query(
      'SELECT * FROM user_profiles WHERE user_id = $1',
      [userId]
    );
    
    return res.status(200).json({
      hasProfile: profile.rows.length > 0,
      profile: profile.rows[0] || null
    });
  } catch (error) {
    console.error('Error checking profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 