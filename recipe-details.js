const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id'); // Get the recipe ID from URL
const recipeTitle = document.getElementById('recipeTitle');
const recipeImage = document.querySelector('.recipeImg');
const recipeInstructions = document.getElementById('recipeInstructions');
const recipeIngredients = document.getElementById('recipeIngredients');

if (recipeId) {
  fetchRecipeDetails(recipeId);
}

async function fetchRecipeDetails(id) {
  const apiKey = '6eb4be1d02d5454cb6e1e318b46b8762';
  const url = `https://api.spoonacular.com/recipes/${id}/information`;
  const options = {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    const recipe = await response.json();

    recipeTitle.textContent = recipe.title;
    recipeImage.src = recipe.image;
    recipeInstructions.innerHTML = recipe.instructions;
    recipeIngredients.textContent = 'Ingredients: ';
    recipe.extendedIngredients.forEach((ingredient) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitShort} of ${ingredient.name}`;
      recipeIngredients.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching recipe details:', error);
  }
}
