const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db');

router.get('/search', async (req, res) => {
  const ingredients = req.query.ingredients;

  if (!ingredients) {
    return res.status(400).json({ error: 'Ingredients are required' });
  }

  try {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
      ingredients
    )}&number=32&ranking=2`;
    const response = await axios.get(url, {
      headers: {
        'x-api-key': process.env.RECIPE_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

router.get('/recipe/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.spoonacular.com/recipes/${id}/information`;
    const response = await axios.get(url, {
      headers: {
        'x-api-key': process.env.RECIPE_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
});

/*
router.get('/users/:id/favourites', (req, res) => {
  const userId = req.params.id;

  db.get(`SELECT favourites FROM users WHERE id = ?`, [userId], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'User not found' });

    const favourites = row.favourites ? JSON.parse(row.favourites) : [];
    res.status(200).json({ favourites });
  });
});*/

router.post('/users/:id/favourites', (req, res) => {
  const userId = req.params.id;
  const favourites = req.body.favourites;

  if (!Array.isArray(favourites)) {
    return res.status(400).json({ error: 'Favourites must be an array.' });
  }

  db.run('UPDATE users SET favourites = ? WHERE id = ?', [JSON.stringify(favourites), userId], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update favourites' });
    res.status(200).json({ message: 'Favourites updated', favourites });
  });
});

module.exports = router;
