const ingredientInput = document.getElementById('ingredient');
const searchBtn = document.getElementById('searchBtn');
const recipeList = document.getElementById('recipeList');
let query = '';
let recipes = [];
const apiKey = '6eb4be1d02d5454cb6e1e318b46b8762';

function addIngredient(inputValue) {
  // Check if the input is not empty
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

function missingInput() {
  alert('Please enter input!');
  return;
}

// Listen for the 'keydown' event on the input field
ingredientInput.addEventListener('keydown', (event) => {
  // Check if the Enter key was pressed
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission or other default behavior
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

searchBtn.addEventListener('click', async () => {
  //query = query.toLowerCase();

  if (!query) {
    missingInput();
  } else {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
      query
    )}`;
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    };
    getMeal(url, options);
  }
});

async function getMeal(url, options) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    /*
		recipes = [];
		recipeList.innerHTML = '';*/
    result.forEach((recipe) => {
      recipes.push(recipe);
      const listItem = document.createElement('li');
      listItem.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}" style="width:100px;height:100px;">
            `;
      recipeList.appendChild(listItem);
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
