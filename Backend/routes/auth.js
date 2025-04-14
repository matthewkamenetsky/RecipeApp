const express = require('express');
const router = express.Router();
const db = require('../db');
const { hashPassword, comparePassword } = require('../utils/hash');

router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    db.run(
      `INSERT INTO users (email, name, password, favourites) VALUES (?, ?, ?, ?)`,
      [email, name, hashedPassword, JSON.stringify([])],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created', userId: this.lastID });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.post('/login', async (req, res) => {
  const { id, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ? OR name = ?`, [id, id], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid id or password' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid id or password' });

    res.status(200).json({ message: 'Login successful', user });
  });
});

module.exports = router;
