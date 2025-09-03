const ingredientInput = document.getElementById('ingredient');
const ingredientList = document.getElementById('ingredientList');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const recipeList = document.getElementById('recipeList');
const user = JSON.parse(sessionStorage.getItem('user'));
const API_URL = process.env.APP_API_URL;
let query = '';
let recipes = [];
let favourites = Array.isArray(user?.favourites)
  ? user.favourites
  : typeof user?.favourites === 'string'
  ? JSON.parse(user.favourites)
  : [];

function missingInput(input = 'input') {
  return alert(`Please enter ${input}`);
}

function addIngredient(inputValue) {
  if (inputValue) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${inputValue}<button onclick='removeIngredient(this, "${inputValue}")' class='remove-btn'>✖</button>`;
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

function removeIngredient(element, ingredient) {
  const toRemove = element.parentElement;

  toRemove.style.transition = 'all 0.5s ease';
  toRemove.style.opacity = '0';
  toRemove.style.transform = 'translateX(-300px)';

  setTimeout(() => {
    toRemove.remove();
    let ingredientsArray = query.split(', ').filter((item) => item !== ingredient);
    query = ingredientsArray.join(', ');

    recipeList.innerHTML = '';
    recipes = [];
  }, 500);
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
    const response = await fetch(`${API_URL}/api/search?ingredients=${query}`);
    const result = await response.json();

    recipes = [];
    recipeList.innerHTML = '';
    result.forEach((recipe) => {
      recipes.push(recipe);

      const isFavourited = favourites.includes(recipe.id);
      const starSymbol = isFavourited ? '★' : '☆';
      const starClass = isFavourited ? 'favourite favourited' : 'favourite';

      const listItem = document.createElement('li');
      listItem.innerHTML = `
                            <a href='recipe-view.html?id=${recipe.id}'>
                              <img class='recipeImg' src='${recipe.image}' alt='${recipe.title}' style='width: 120px; height: 120px'>
                            </a>          
                            <h4>${recipe.title}</h4>
                            <button class='${starClass}' onclick='toggleFavourite(this, ${recipe.id})'>${starSymbol}</button>
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

function toggleFavourite(button, recipeId) {
  if (!user) {
    alert('You must be logged in to favourite recipes.');
    return;
  }

  isFavourited = button.classList.toggle('favourited');
  button.textContent = isFavourited ? '★' : '☆';
  favourites = isFavourited ? [...favourites, recipeId] : favourites.filter((id) => id !== recipeId);
  user.favourites = favourites;
  sessionStorage.setItem('user', JSON.stringify(user));
}

window.addEventListener('beforeunload', () => {
  if (user) {
    fetch(`${API_URL}/api/users/${user.id}/favourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favourites: user.favourites }),
    });
  }
});
