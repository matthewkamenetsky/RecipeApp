const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id'); // Get the recipe ID from URL

if (recipeId) {
  fetchRecipeDetails(recipeId);
}

async function fetchRecipeDetails(id) {
  const apiKey = '6eb4be1d02d5454cb6e1e318b46b8762';
  const url = `https://api.spoonacular.com/recipes/${id}/information`;
  const options = {
    method: 'GET',
    headers: {
      'x-api-key': apiKey
    }
  };

  try {
    const response = await fetch(url, options);
    const recipe = await response.json();

    document.getElementById('recipeTitle').textContent = recipe.title;
    document.getElementById('recipeImage').src = recipe.image;
    document.getElementById('recipeInstructions').innerHTML = recipe.instructions;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
  }
}