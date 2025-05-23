const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');
const recipeTitle = document.getElementById('recipeTitle');
const recipeImage = document.querySelector('.recipeImg');
const recipeInstructions = document.getElementById('recipeInstructions');
const recipeIngredients = document.getElementById('recipeIngredients');

if (recipeId) {
  fetchRecipeDetails(recipeId);
}

async function fetchRecipeDetails(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/recipe/${id}`);
    const recipe = await response.json();

    recipeTitle.textContent = recipe.title;
    recipeImage.src = recipe.image;
    recipeInstructions.innerHTML = recipe.instructions;
    recipeIngredients.textContent = 'Ingredients: ';
    recipe.extendedIngredients.forEach((ingredient) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${ingredient.original}`;
      recipeIngredients.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching recipe details:', error);
  }
}
