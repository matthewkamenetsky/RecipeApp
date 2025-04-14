const express = require('express');
const router = express.Router();
const axios = require('axios');

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

module.exports = router;
