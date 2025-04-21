const express = require('express');
const router = express.Router();
const db = require('../db');
const { hashPassword, comparePassword } = require('../utils/hash');

router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    db.run(
      'INSERT INTO users (email, name, password, favourites) VALUES (?, ?, ?, ?)',
      [email, name, hashedPassword, JSON.stringify([])],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        db.get('SELECT id, email, name, favourites FROM users WHERE id = ?', [this.lastID], (err, user) => {
          if (err) {
            return res.status(500).json({ error: 'Error fetching user after creation' });
          }
          res.status(201).json({ message: 'User created', user });
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.post('/login', async (req, res) => {
  const { id, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ? OR name = ?', [id, id], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid id or password' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid id or password' });

    const { password: _, ...safeUser} = user;
    res.status(200).json({ message: 'Login successful', safeUser });
  });
});

module.exports = router;
