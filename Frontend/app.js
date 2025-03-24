const ingredientInput = document.getElementById('ingredient');
const ingredientList = document.getElementById('ingredientList');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const recipeList = document.getElementById('recipeList');
let query = '';
let recipes = [];

function missingInput(input = "input") {
  return alert(`Please enter ${input}`);
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

async function getMeal() {
  query = query.toLowerCase();

  if (!query) {
    missingInput('ingredients');
  }

  try {
    const response = await fetch(`http://localhost:3000/api/recipes?ingredients=${query}`);
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
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

searchBtn.addEventListener('click', getMeal);

clearBtn.addEventListener('click', () => {
  ingredientList.innerHTML = '';
  recipeList.innerHTML = '';
  query = '';
  recipes = [];
});
