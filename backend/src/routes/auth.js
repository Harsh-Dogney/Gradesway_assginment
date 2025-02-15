import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/database.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // For demo purposes, we'll use static credentials
    if (username === 'demo' && password === 'demo123') {
      const [users] = await pool.query('SELECT id, username FROM users WHERE username = ?', [username]);
      if (users.length > 0) {
        res.json({ 
          success: true, 
          user: { 
            id: users[0].id, 
            username: users[0].username 
          }
        });
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;