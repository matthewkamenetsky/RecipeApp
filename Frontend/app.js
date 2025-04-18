const ingredientInput = document.getElementById('ingredient');
const ingredientList = document.getElementById('ingredientList');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const recipeList = document.getElementById('recipeList');
let query = '';
let recipes = [];

function missingInput(input = 'input') {
  return alert(`Please enter ${input}`);
}

function addIngredient(inputValue) {
  if (inputValue) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${inputValue}<button onclick="removeIngredient(this, '${inputValue}')" class="remove-btn">✖</button>`;
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
    const response = await fetch(`http://localhost:3000/api/search?ingredients=${query}`);
    const result = await response.json();

    recipes = [];
    recipeList.innerHTML = '';
    result.forEach((recipe) => {
      recipes.push(recipe);
      const listItem = document.createElement('li');
      listItem.innerHTML = `
                            <a href="recipe-view.html?id=${recipe.id}">
                              <img class="recipeImg" src="${recipe.image}" alt="${recipe.title}" style="width: 120px; height: 120px">
                            </a>          
                            <h4>${recipe.title}</h4>
                            <button class="bookmark" onClick="toggleBookmark(this)">☆</button>
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

function toggleBookmark(button) {
  button.classList.toggle("bookmarked");
  if (button.classList.contains("bookmarked")) {
    button.textContent = "★"; 
  } else {
    button.textContent = "☆";
  }
}
