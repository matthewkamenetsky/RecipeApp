require('dotenv').config();

const ingredientInput = document.getElementById('ingredient');
const ingredientList = document.getElementById('ingredientList');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const recipeList = document.getElementById('recipeList');
let query = '';
let recipes = [];
const apiKey = process.env.RECIPE_KEY;

function missingInput() {
  alert('Please enter input!');
  return;
}

function addIngredient(inputValue) {
  if (inputValue) {
    const listItem = document.createElement('li');
    listItem.textContent = inputValue;
    ingredientList.appendChild(listItem);
    if (query) {
      query += ', ';
    }
    query += inputValue;
    ingredientInput.value = '';
  } else {
    missingInput();
  }
}

ingredientInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); 
    const inputValue = ingredientInput.value.trim();
    addIngredient(inputValue);
  }
});

addBtn.addEventListener('click', () => {
  const inputValue = ingredientInput.value.trim();
  if (inputValue) {
    addIngredient(inputValue);
  } else {
    missingInput();
  }
});

async function getMeal(url, options) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    recipes = [];
    recipeList.innerHTML = '';
    result.forEach((recipe) => {
      recipes.push(recipe);
      const listItem = document.createElement('li');
      listItem.innerHTML = `
                <h4>${recipe.title}</h4>
                <a href="recipe-view.html?id=${recipe.id}">
                  <img class="recipeImg" src="${recipe.image}" alt="${recipe.title}" style="width:90px;height:90px;">
                </a>
            `;
      recipeList.appendChild(listItem);
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

searchBtn.addEventListener('click', async () => {
  query = query.toLowerCase();

  if (!query) {
    missingInput();
  } else {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
      query
    )}&number=50&sort=min-missing-ingredients`;
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    };
    getMeal(url, options);
  }
});

clearBtn.addEventListener('click', () => {
  ingredientList.innerHTML = '';
  recipeList.innerHTML = '';
  query = '';
  recipes = [];
});
